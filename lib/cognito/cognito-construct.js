"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoConstruct = void 0;
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cognito_1 = require("aws-cdk-lib/aws-cognito");
const aws_cognito_identitypool_alpha_1 = require("@aws-cdk/aws-cognito-identitypool-alpha");
class CognitoConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // Define the Cognito API
        this.userPool = new aws_cognito_1.UserPool(this, `${props.name}_userPool`, {
            selfSignUpEnabled: false,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            accountRecovery: aws_cognito_1.AccountRecovery.PHONE_AND_EMAIL,
            userVerification: {
                emailStyle: aws_cognito_1.VerificationEmailStyle.CODE,
            },
            signInAliases: {
                username: true,
                email: true,
                phone: true
            },
            passwordPolicy: {
                requireDigits: true,
                requireLowercase: true,
                requireSymbols: true,
                requireUppercase: true,
                minLength: 8,
            },
            userInvitation: {
                emailBody: "Your username is {username} and temporary password is {####}"
            },
            autoVerify: {
                email: true,
                phone: true,
            },
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true
                },
                phoneNumber: {
                    required: true,
                    mutable: true
                },
            },
            customAttributes: {
            // organizationId: new StringAttribute({
            //     minLen: 36,
            //     maxLen: 36,
            //     mutable: true
            // }),
            },
            userPoolName: props.name,
        });
        const groups = ["admin", "club", "trainer", "member", "invited"];
        groups.forEach((groupName) => new aws_cognito_1.CfnUserPoolGroup(this, `${props.name}${groupName}Group`, {
            userPoolId: this.userPool.userPoolId,
            groupName: groupName,
        }));
        const userPoolClient = new aws_cognito_1.UserPoolClient(this, `${props.name}Client`, {
            userPool: this.userPool,
        });
        const identityPool = new aws_cognito_identitypool_alpha_1.IdentityPool(this, props.name, {
            identityPoolName: props.name,
            allowUnauthenticatedIdentities: true,
            authenticationProviders: {
                userPools: [
                    new aws_cognito_identitypool_alpha_1.UserPoolAuthenticationProvider({ userPool: this.userPool, userPoolClient }),
                ],
            },
        });
        this.authenticatedRole = identityPool.authenticatedRole;
        this.unauthenticatedRole = identityPool.unauthenticatedRole;
        this.identityPoolId = new aws_cdk_lib_1.CfnOutput(this, 'IdentityPoolId', {
            value: identityPool.identityPoolId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'UserPoolId', {
            value: this.userPool.userPoolId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'UserPoolClientId', {
            value: userPoolClient.userPoolClientId,
        });
    }
}
exports.CognitoConstruct = CognitoConstruct;
