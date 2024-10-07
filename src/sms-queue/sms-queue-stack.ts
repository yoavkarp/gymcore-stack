import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { SMSQueueTableConstruct } from "./sms-queue-table";
import { SMSQueueAPIConstruct } from "./appsync/sms-queue-api";
import { Code, Function, ILayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import path from "path";
import { IKey, Key } from "aws-cdk-lib/aws-kms";
import { LayerConstruct } from "../layers/layer-construct";

type SMSQueueStackProps = StackProps & {
    // awsSdkLayer: ILayerVersion;
}

export class SMSQueueStack extends Stack {
    SMS_SENDTriggerLambda: Function;
    KmsKey: IKey;

    constructor(scope: Construct, id: string, props: SMSQueueStackProps) {
        super(scope, id, props);

        const table = new SMSQueueTableConstruct(this, 'SMSQueueTable');
        const api = new SMSQueueAPIConstruct(this, 'SMSQueueAPI', {
            table: table.table,
        });

        const SMS_SENDLayer = new LayerConstruct(this, 'sms-send-layer', {
            layerFolder: 'sms-send-layer',
        });

        this.KmsKey = new Key(this, 'VerifySMSKmsKey', {
            enableKeyRotation: true,  // Enable automatic key rotation
            description: 'Custom KMS key for encrypting Cognito Phone Code',
            alias: 'VerifySMSKmsKey',
        });

        this.SMS_SENDTriggerLambda = new Function(this, 'SMS_SEND', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            functionName: "SMS_SEND_Trigger",
            code: Code.fromAsset(path.join(__dirname, "..", "lambdas", 'SMS_SEND')),
            layers: [SMS_SENDLayer.layerVersion],
            logRetention: RetentionDays.TWO_WEEKS,
            environment: {
                GRAPHQL_ENDPOINT: api.api.graphqlUrl,
                API_KEY: api.api.apiKey || '',
                KEY_ALIAS: "VerifySMSKmsKey",
                KEY_ARN: this.KmsKey.keyArn,
            },
        })

        this.KmsKey.grantDecrypt(this.SMS_SENDTriggerLambda);


    }
}