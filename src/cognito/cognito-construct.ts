import { Construct } from 'constructs';
import { CfnOutput, Duration, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { AccountRecovery, CfnUserPoolGroup, Mfa, StringAttribute, UserPool, UserPoolClient, UserPoolOperation, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import { IRole, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import {
    IdentityPool,
    UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'
import { Code, Function, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import path from 'path';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { DynamoDBStack } from '@/dynamodb/dynamodb-stack';
import { IKey, Key } from 'aws-cdk-lib/aws-kms';

interface CognitoConstructProps extends StackProps {
    readonly tenantName: string
    readonly tenantId: string
    readonly awsSdkLayer: ILayerVersion
    tables: DynamoDBStack['tables']
    readonly SMS_SENDLambda: Function;
    readonly KmsKey: IKey;
}


export class CognitoConstruct extends Construct {
    public readonly userPool: UserPool;
    public readonly authenticatedRole: IRole
    public readonly unauthenticatedRole: IRole

    constructor(scope: Construct, id: string, props: CognitoConstructProps) {
        super(scope, id);

        const preTokenGenerationLambda = new Function(scope, 'PreTokenGeneration', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            functionName: props.tenantName + "_preTokenGeneration",
            code: Code.fromAsset(path.join(__dirname, "..", "lambdas", 'preTokenGeneration')),
            layers: [props.awsSdkLayer],
            logRetention: RetentionDays.TWO_WEEKS,
            environment: {
                TENANT_ID: props.tenantId,
            },
            timeout: Duration.seconds(10),
        })

        this.userPool = new UserPool(this, "UserPool", {
            selfSignUpEnabled: false,
            removalPolicy: RemovalPolicy.DESTROY,
            accountRecovery: AccountRecovery.PHONE_AND_EMAIL,
            userVerification: {
                emailStyle: VerificationEmailStyle.CODE,
            },
            mfa: Mfa.REQUIRED,
            mfaSecondFactor: {
                sms: true,
                otp: true,
            },
            signInAliases: {
                username: true,
                email: true,
                phone: true,
                preferredUsername: true
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
                preferredUsername: {
                    required: true,
                    mutable: true
                }
            },
            lambdaTriggers: {
                customSmsSender: props.SMS_SENDLambda
            },
            customSenderKmsKey: props.KmsKey,
            userPoolName: `${props.tenantName} UserPool`,
            customAttributes: {
                tenantId: new StringAttribute({
                    mutable: true,
                })
            }
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


        this.userPool.addTrigger(UserPoolOperation.PRE_TOKEN_GENERATION, preTokenGenerationLambda)

        // Attach the policy to the Lambda
        preTokenGenerationLambda.role!.attachInlinePolicy(new Policy(this, 'userpool-policy', {
            statements: [new PolicyStatement({
                actions: ['cognito-idp:*'],
                resources: [this.userPool.userPoolArn],
            })],
        }));

        props.tables.memberTable.grantFullAccess(preTokenGenerationLambda)
        props.tables.clubTable.grantFullAccess(preTokenGenerationLambda)

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