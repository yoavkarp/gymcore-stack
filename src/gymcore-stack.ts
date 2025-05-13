import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppSyncConstruct } from './appsync/appsync-construct';
import { CognitoConstruct } from './cognito/cognito-construct';
import { LayerConstruct } from './layers/layer-construct';
import { DynamoDBStack } from './dynamodb/dynamodb-stack';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { IKey } from 'aws-cdk-lib/aws-kms';

type GymcoreCdkStackProps = StackProps & {
    tenantName: string;
    tenantId: string;
    tables: DynamoDBStack['tables'];
    SMS_SENDLambda: Function;
    SmsVerifyKmsKey: IKey;
    aws_lambda: Function;
}

class GymcoreCdkStack extends Stack {

    private readonly awsSdkLayer: LayerConstruct;
    private readonly auth: CognitoConstruct;
    private readonly api: AppSyncConstruct;

    constructor(scope: Construct, id: string, props: GymcoreCdkStackProps) {
        super(scope, id, props);

        this.awsSdkLayer = new LayerConstruct(this, 'aws-sdk-layer', {
            layerFolder: 'aws-sdk-layer',
        });

        this.auth = new CognitoConstruct(this, 'Auth', {
            tenantName: props.tenantName,
            tenantId: props.tenantId,
            awsSdkLayer: this.awsSdkLayer.layerVersion,
            tables: props.tables,
            SMS_SENDLambda: props.SMS_SENDLambda,
            KmsKey: props.SmsVerifyKmsKey
        })

        this.api = new AppSyncConstruct(this, 'Api', {
            userPool: this.auth.userPool,
            tenantName: props.tenantName,
            layers: [this.awsSdkLayer.layerVersion],
            tenantId: props.tenantId,
            tables: props.tables,
            api_lambda: props.aws_lambda,
        })

        new CfnOutput(this, "tenantId", {
            value: props.tenantId
        })

        new CfnOutput(this, "tenantName", {
            value: props.tenantName
        })

        if (props.env?.region)
            new CfnOutput(this, "region", {
                value: props.env?.region
            })

    }
}

export {
    GymcoreCdkStack
}
