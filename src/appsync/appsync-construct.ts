import { Construct } from 'constructs';
import { AuthorizationType, BackedDataSource, FieldLogLevel, SchemaFile } from 'aws-cdk-lib/aws-appsync';
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import path from 'path';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Code, Function, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { DynamoDBStack } from '@/dynamodb/dynamodb-stack';

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
            schema: SchemaFile.fromAsset(path.join("src", "appsync", 'schema.graphql')),
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
            xrayEnabled: false,
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
        props.userPool.grant(api_lambda, 'cognito-idp:*')

        const api_lambda_ds = this.api.addLambdaDataSource("api", api_lambda);

        this.api.createResolver("createMember", {
            typeName: "Mutation",
            fieldName: "createMember",
            dataSource: api_lambda_ds
        })

        this.dataSources = [
            // api lambda
            api_lambda_ds
        ]
            .concat(
                // tables
                Object.keys(props.tables).map((key) => {
                    return this.api.addDynamoDbDataSource(key, props.tables[key as keyof DynamoDBStack['tables']], {
                        name: props.tables[key as keyof DynamoDBStack['tables']].tableName + "_DataSource"
                    })
                }))

        new CfnOutput(this, 'GRAPHQL_URL', {
            value: this.api.graphqlUrl,
        })

        new CfnOutput(this, 'API_ID', {
            value: this.api.apiId,
        })

        new CfnOutput(this, 'API_KEY', {
            value: this.api.apiKey || "",
        })
    }
}