import { Function, ILayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
declare const members: (scope: Construct, layers: ILayerVersion[], tenantId: string) => Function;
export default members;
