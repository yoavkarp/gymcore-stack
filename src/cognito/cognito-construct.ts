import { Construct } from 'constructs';
import { CfnOutput, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { AccountRecovery, CfnUserPoolGroup, StringAttribute, UserPool, UserPoolClient, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import { IRole } from 'aws-cdk-lib/aws-iam';
import {
    IdentityPool,
    UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'

interface CognitoConstructProps extends StackProps {
    readonly name: string
}


export class CognitoConstruct extends Construct {
    public readonly userPool: UserPool;
    public readonly identityPoolId: CfnOutput
    public readonly authenticatedRole: IRole
    public readonly unauthenticatedRole: IRole

    constructor(scope: Construct, id: string, props: CognitoConstructProps) {
        super(scope, id);

        // Define the Cognito API
        this.userPool = new UserPool(this, `${props.name}_userPool`, {
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
        })

        const groups = ["admin", "club", "trainer", "member", "invited"];

        groups.forEach(
            (groupName) =>
                new CfnUserPoolGroup(
                    this,
                    `${props.name}${groupName}Group`,
                    {
                        userPoolId: this.userPool.userPoolId,
                        groupName: groupName,
                    }
                )
        )

        const userPoolClient = new UserPoolClient(
            this,
            `${props.name}Client`,
            {
                userPool: this.userPool,
            }
        )

        const identityPool = new IdentityPool(
            this,
            props.name,
            {
                identityPoolName: props.name,
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

        this.identityPoolId = new CfnOutput(this, 'IdentityPoolId', {
            value: identityPool.identityPoolId,
        })

        new CfnOutput(this, 'UserPoolId', {
            value: this.userPool.userPoolId,
        })

        new CfnOutput(this, 'UserPoolClientId', {
            value: userPoolClient.userPoolClientId,
        })


    }
}