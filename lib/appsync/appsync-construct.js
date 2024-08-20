"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSyncConstruct = void 0;
const constructs_1 = require("constructs");
const aws_appsync_1 = require("aws-cdk-lib/aws-appsync");
const aws_appsync_2 = require("aws-cdk-lib/aws-appsync");
const path_1 = __importDefault(require("path"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
class AppSyncConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // Define the AppSync API
        this.api = new aws_appsync_2.GraphqlApi(this, `${props.name}_Api`, {
            name: props.name,
            schema: aws_appsync_1.SchemaFile.fromAsset(path_1.default.join(__dirname, 'schema.graphql')),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: aws_appsync_1.AuthorizationType.USER_POOL,
                    userPoolConfig: {
                        userPool: props.userPool,
                    },
                },
            },
            logConfig: {
                fieldLogLevel: aws_appsync_1.FieldLogLevel.ALL,
            },
            xrayEnabled: false,
        });
        this.dataSources = props.lambdas.map((lambda) => this.api.addLambdaDataSource(lambda.functionName, lambda));
        this.dataSources[0].createResolver(`Mutation.deleteMember`, {
            fieldName: "deleteMember",
            typeName: "Mutation"
        });
        new aws_cdk_lib_1.CfnOutput(this, 'GRAPHQL_URL', {
            value: this.api.graphqlUrl,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'API_ID', {
            value: this.api.apiId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'API_KEY', {
            value: this.api.apiKey || "",
        });
    }
}
exports.AppSyncConstruct = AppSyncConstruct;
