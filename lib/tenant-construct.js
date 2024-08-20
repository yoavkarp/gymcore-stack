"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantConstruct = void 0;
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cognito_construct_1 = require("./cognito/cognito-construct");
const appsync_construct_1 = require("./appsync/appsync-construct");
class TenantConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // lambdas
        this.auth = new cognito_construct_1.CognitoConstruct(this, props.name, {
            name: props.name
        });
        this.auth = new cognito_construct_1.CognitoConstruct(this, 'HolmesPlaceGymcoreAuth', {
            name: 'HolmesPlaceGymcoreAuth'
        });
        this.appsync = new appsync_construct_1.AppSyncConstruct(this, 'HolmesPlaceGymcoreApi', {
            userPool: this.auth.userPool,
            name: "HolmesPlaceGymcoreApi",
            lambdas: props.lambdas
        });
        new aws_cdk_lib_1.CfnOutput(this, 'GRAPHQL_URL', {
            value: this.appsync.api.graphqlUrl,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'API_ID', {
            value: this.appsync.api.apiId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'API_KEY', {
            value: this.appsync.api.apiKey || "",
        });
    }
}
exports.TenantConstruct = TenantConstruct;
