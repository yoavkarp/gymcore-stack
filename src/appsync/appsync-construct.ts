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

// Export the merged schema
type AppSyncConstructProps = {
    userPool: UserPool;
    tenantName: string;
    layers: ILayerVersion[];
    tenantId: string;
    tables: DynamoDBStack['tables'];
}

const schemaPath = path.join("src", "appsync", 'schema.graphql');

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
            timeout: Duration.seconds(10)
        })

        props.tables.clubTable.grantFullAccess(api_lambda)
        props.tables.memberTable.grantFullAccess(api_lambda)
        props.tables.tenantTable.grantFullAccess(api_lambda)
        props.tables.userTable.grantFullAccess(api_lambda)
        props.tables.trainerTable.grantFullAccess(api_lambda)
        props.tables.measurementTable.grantFullAccess(api_lambda)
        props.tables.goalTable.grantFullAccess(api_lambda)
        props.tables.trainerIndexTable.grantFullAccess(api_lambda)
        props.tables.workoutTable.grantFullAccess(api_lambda)
        props.tables.libraryTable.grantFullAccess(api_lambda)
        props.userPool.grant(api_lambda, 'cognito-idp:*')

        const api_lambda_ds = this.api.addLambdaDataSource("api", api_lambda);

        this.dataSources = [
            // api lambda
            api_lambda_ds,
            this.api.addDynamoDbDataSource("club", props.tables.clubTable, { name: "ClubTable" }),
            this.api.addDynamoDbDataSource("member", props.tables.memberTable, { name: "MemberTable" }),
            this.api.addDynamoDbDataSource("tenant", props.tables.tenantTable, { name: "TenantTable" }),
            this.api.addDynamoDbDataSource("user", props.tables.userTable, { name: "UserTable" }),
            this.api.addDynamoDbDataSource("trainer", props.tables.trainerTable, { name: "TrainerTable" }),
            this.api.addDynamoDbDataSource("measurement", props.tables.measurementTable, { name: "MeasurementTable" }),
            this.api.addDynamoDbDataSource("event", props.tables.eventTable, { name: "EventTable" }),
            this.api.addDynamoDbDataSource("goal", props.tables.goalTable, { name: "GoalTable" }),
            this.api.addDynamoDbDataSource("workout", props.tables.workoutTable, { name: "WorkoutTable" }),
            this.api.addDynamoDbDataSource("library", props.tables.libraryTable, { name: "LibraryTable" }),
        ]

        const resolversPath = path.join(__dirname, "resolvers");
        const resolversFiles = fs.readdirSync(resolversPath).filter(file => !fs.fstatSync(fs.openSync(path.join(resolversPath, file), 'r')).isDirectory());
        resolversFiles.map((file) => {
            return {
                typeName: file.split('.')[0],
                resolver: require(path.join(resolversPath, file)).resolver as ResolverType<any>
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