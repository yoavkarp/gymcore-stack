import { Construct } from 'constructs';
import { CfnOutput, StackProps } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { IRole } from 'aws-cdk-lib/aws-iam';
interface CognitoConstructProps extends StackProps {
    readonly name: string;
}
export declare class CognitoConstruct extends Construct {
    readonly userPool: UserPool;
    readonly identityPoolId: CfnOutput;
    readonly authenticatedRole: IRole;
    readonly unauthenticatedRole: IRole;
    constructor(scope: Construct, id: string, props: CognitoConstructProps);
}
export {};
