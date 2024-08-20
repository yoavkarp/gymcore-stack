import { Construct } from 'constructs';
import { BackedDataSource } from 'aws-cdk-lib/aws-appsync';
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Function } from 'aws-cdk-lib/aws-lambda';
type AppSyncConstructProps = {
    userPool: UserPool;
    name: string;
    lambdas: Function[];
};
export declare class AppSyncConstruct extends Construct {
    readonly api: GraphqlApi;
    readonly dataSources: BackedDataSource[];
    constructor(scope: Construct, id: string, props: AppSyncConstructProps);
}
export {};
