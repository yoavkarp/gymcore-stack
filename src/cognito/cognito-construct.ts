import { Construct } from 'constructs';
import { CfnOutput, Duration, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { AccountRecovery, CfnUserPoolGroup, UserPool, UserPoolClient, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import { IRole } from 'aws-cdk-lib/aws-iam';
import {
    IdentityPool,
    UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'
import { Code, Function, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import path from 'path';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

interface CognitoConstructProps extends StackProps {
    readonly tenantName: string
    readonly tenantId: string
    readonly awsSdkLayer: ILayerVersion
}


export class CognitoConstruct extends Construct {
    public readonly userPool: UserPool;
    public readonly authenticatedRole: IRole
    public readonly unauthenticatedRole: IRole

    constructor(scope: Construct, id: string, props: CognitoConstructProps) {
        super(scope, id);

        // Define the Cognito API
        this.userPool = new UserPool(this, "UserPool", {
            selfSignUpEnabled: false,
            removalPolicy: RemovalPolicy.DESTROY,
            accountRecovery: AccountRecovery.PHONE_AND_EMAIL,
            userVerification: {
                emailStyle: VerificationEmailStyle.CODE,
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
                    required: false,
                    mutable: true
                },
                phoneNumber: {
                    required: true,
                    mutable: true
                },
                lastUpdateTime: {
                    required: false,
                    mutable: true
                },
            },
            lambdaTriggers: {
                peTokenGeneration: new Function(this, 'PreTokenGeneration', {
                    runtime: Runtime.NODEJS_18_X,
                    handler: 'index.handler',
                    functionName: props.tenantName + "_preTokenGeneration",
                    code: Code.fromAsset(path.join(__dirname, "..", "lambdas", 'preTokenGeneration')),
                    layers: [props.awsSdkLayer],
                    logRetention: RetentionDays.TWO_WEEKS,
                    environment: {
                        TENANT_ID: props.tenantId,
                    },
                    timeout: Duration.seconds(10)
                })
            },
            userPoolName: `${props.tenantName} UserPool`,
        })

        const groups = ["admin", "club", "trainer", "member"];

        groups.forEach(
            (groupName) =>
                new CfnUserPoolGroup(
                    this,
                    `${groupName}Group`,
                    {
                        userPoolId: this.userPool.userPoolId,
                        groupName: groupName,
                    }
                )
        )

        const userPoolClient = new UserPoolClient(
            this,
            `UserPoolClient`,
            {
                userPool: this.userPool,
                userPoolClientName: props.tenantName,
            }
        )

        const identityPool = new IdentityPool(
            this,
            props.tenantName,
            {
                identityPoolName: props.tenantName,
                allowUnauthenticatedIdentities: true,
                authenticationProviders: {
                    userPools: [
                        new UserPoolAuthenticationProvider({ userPool: this.userPool, userPoolClient }),
                    ],
                },
            }
        )

        this.authenticatedRole = identityPool.authenticatedRole
        this.unauthenticatedRole = identityPool.unauthenticatedRole

        new CfnOutput(scope, 'IdentityPoolId', {
            value: identityPool.identityPoolId,
        })

        new CfnOutput(scope, 'UserPoolId', {
            value: this.userPool.userPoolId,
        })

        new CfnOutput(scope, 'UserPoolClientId', {
            value: userPoolClient.userPoolClientId,
        })


    }
}