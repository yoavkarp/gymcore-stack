import { Construct } from 'constructs';
import { AuthorizationType, Code, FieldLogLevel, FunctionRuntime, SchemaFile } from 'aws-cdk-lib/aws-appsync';
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import path from 'path';
import { CfnOutput } from 'aws-cdk-lib';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

// Export the merged schema
type SMSQueueAPIConstructProps = {
    table: ITable;
}

const schemaPath = path.join("src", "sms-queue", "appsync", 'schema.graphql');
const resolversPath = path.join("src", "sms-queue", "appsync", 'resolvers');

export class SMSQueueAPIConstruct extends Construct {
    public readonly api: GraphqlApi;

    constructor(scope: Construct, id: string, props: SMSQueueAPIConstructProps) {
        super(scope, id);

        // Define the SMSQueueAPI API
        this.api = new GraphqlApi(this, "sms-api", {
            name: `SMSQUEUE_API`,
            schema: SchemaFile.fromAsset(schemaPath),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.API_KEY,
                },
            },
            logConfig: {
                fieldLogLevel: FieldLogLevel.ALL,
            },
            xrayEnabled: false
        })

        const table_datasource = this.api.addDynamoDbDataSource('SMSQueueTable', props.table, { name: 'SMSQueueTable' });

        table_datasource.createResolver("createSMSQueue", {
            runtime: FunctionRuntime.JS_1_0_0,
            code: Code.fromAsset(path.join(resolversPath, "createSMSRequest.js")),
            typeName: "Mutation",
            fieldName: "createSMSQueue",
        })

        table_datasource.createResolver("deleteSMSQueue", {
            runtime: FunctionRuntime.JS_1_0_0,
            code: Code.fromAsset(path.join(resolversPath, "deleteSMSRequest.js")),
            typeName: "Mutation",
            fieldName: "deleteSMSQueue",
        })

        table_datasource.createResolver("listSMSQueues", {
            runtime: FunctionRuntime.JS_1_0_0,
            code: Code.fromAsset(path.join(resolversPath, "listSMSRequests.js")),
            typeName: "Query",
            fieldName: "listSMSQueues",
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