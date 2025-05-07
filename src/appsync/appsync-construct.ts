import { Construct } from 'constructs';
import { AuthorizationType, BackedDataSource, FieldLogLevel, SchemaFile } from 'aws-cdk-lib/aws-appsync';
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import path from 'path';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Code, Function, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { DynamoDBStack } from '@/dynamodb/dynamodb-stack';
import fs from 'fs'
import { resolver } from './resolvers/Query';
import { ResolverData, ResolverType } from './types/ResolverType';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';

// Export the merged schema
type AppSyncConstructProps = {
    userPool: UserPool;
    tenantName: string;
    layers: ILayerVersion[];
    tenantId: string;
    tables: DynamoDBStack['tables'];
}

export class AppSyncConstruct extends Construct {
    public readonly api: GraphqlApi;
    public readonly dataSources: BackedDataSource[];

    constructor(scope: Construct, id: string, props: AppSyncConstructProps) {
        super(scope, id);

        // Define the AppSync API
        this.api = new GraphqlApi(this, "api", {
            name: `${props.tenantName}_API`,
            schema: SchemaFile.fromAsset(path.join("src", "appsync", "schema.graphql")),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.USER_POOL,
                    userPoolConfig: {
                        userPool: props.userPool,
                    },
                },
            },
            logConfig: {
                fieldLogLevel: FieldLogLevel.ALL,
            },
            xrayEnabled: false
        })

        const api_lambda = new Function(scope, "api", {
            functionName: `${props.tenantName}_API_Lambda`,
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.main',
            code: Code.fromAsset(
                path.join(__dirname, "..", "lambdas", 'api')
            ),
            layers: props.layers,
            logRetention: RetentionDays.TWO_WEEKS,
            environment: {
                TENANT_ID: props.tenantId,
                USER_POOL_ID: props.userPool.userPoolId
            },
            timeout: Duration.seconds(10),
        })

        const API_TABLES: Array<keyof typeof props.tables> = [
            "activeWorkoutTable",
            "clubTable",
            "eventTable",
            "goalTable",
            "measurementTable",
            "memberTable",
            "planTable",
            "tenantTable",
            "trainerTable",
            "userTable",
            "workoutTable",
            "trainerIndexTable"
        ];

        const s3bucketexercises = s3.Bucket.fromBucketName(this, 'gymcore-exercises', 'gymcore-exercises');
        s3bucketexercises.grantReadWrite(api_lambda);

        const exercisesCollectionTable = Table.fromTableName(this, "ExercisesCollection", "ExercisesCollection");
        exercisesCollectionTable.grantFullAccess(api_lambda);

        API_TABLES.forEach((table) => {
            props.tables[table].grantFullAccess(api_lambda)
        })
        props.userPool.grant(api_lambda, 'cognito-idp:*')

        const api_lambda_ds = this.api.addLambdaDataSource("api", api_lambda);
        this.dataSources = [
            // api lambda
            api_lambda_ds,
            // DynamoDB tables
            ...API_TABLES.map((table) => {
                return this.api.addDynamoDbDataSource(table.replace("Table", ""), props.tables[table], { name: `${table[0].toUpperCase()}${table.substring(1)}` })
            }),
            this.api.addDynamoDbDataSource("ExercisesCollection", exercisesCollectionTable, { name: "ExercisesCollection" })
        ]

        const resolversPath = path.join(__dirname, "resolvers");
        const resolversFiles = fs.readdirSync(resolversPath).filter(file => !fs.fstatSync(fs.openSync(path.join(resolversPath, file), 'r')).isDirectory());
        resolversFiles.map((file) => {
            return {
                typeName: file.split('.')[0],
                resolver: require(path.join(resolversPath, file)).resolver({ "tenantId": props.tenantId }) as ResolverType<any>
            }
        }).forEach(({ resolver, typeName }) => {
            const fields = Object.keys(resolver);

            fields.forEach((fieldName) => {

                const f = resolver[fieldName as keyof typeof resolver]! as ResolverData;
                if (typeof (f) === 'string') return;

                const dataSource = this.dataSources.find((ds) => ds.name === f.dataSourceName);
                if (!dataSource) throw new Error(`DataSource not found: ${f.dataSourceName}`);

                dataSource.createResolver(`${typeName}.${fieldName}`, {
                    fieldName,
                    typeName,
                    requestMappingTemplate: f.req,
                    responseMappingTemplate: f.res,
                })
            })
        })



        new CfnOutput(scope, 'ApiEndpoint', {
            value: this.api.graphqlUrl,
        })

        new CfnOutput(scope, 'ApiId', {
            value: this.api.apiId,
        })

        if (this.api.apiKey)
            new CfnOutput(scope, 'ApiKey', {
                value: this.api.apiKey,
            })
    }
}