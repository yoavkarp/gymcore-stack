import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
declare class GymcoreCdkStack extends Stack {
    private readonly databaseLayer;
    private readonly tenants;
    constructor(scope: Construct, id: string, props: StackProps);
}
export { GymcoreCdkStack };
