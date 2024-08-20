import { Code, Function, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { Construct } from 'constructs'
import path from 'path'


const members = (scope: Construct, layers: ILayerVersion[], tenantId: string) => new Function(scope, `Members_${tenantId}`, {
    functionName: `Members_${tenantId}`,
    runtime: Runtime.NODEJS_18_X,
    handler: 'index.main',
    code: Code.fromAsset(
        path.join(__dirname, "..", "..", "lambdas", 'AppSync.Members')
    ),
    layers,
    environment: {
        tenantId
    },
    logRetention: RetentionDays.ONE_MONTH,
})

export default members;