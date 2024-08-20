import { Construct } from 'constructs';
import { CognitoConstruct } from './cognito/cognito-construct';
import { AppSyncConstruct } from './appsync/appsync-construct';
import { Function } from 'aws-cdk-lib/aws-lambda';
type TenantConstructProps = {
    name: string;
    lambdas: Function[];
};
export declare class TenantConstruct extends Construct {
    readonly appsync: AppSyncConstruct;
    readonly auth: CognitoConstruct;
    constructor(scope: Construct, id: string, props: TenantConstructProps);
}
export {};
