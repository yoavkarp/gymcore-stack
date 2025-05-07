#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { GymcoreCdkStack } = require('../lib/gymcore-stack');
const { DynamoDBStack } = require('../lib/dynamodb/dynamodb-stack');
const { SMSQueueStack } = require('../lib/sms-queue/sms-queue-stack');

const app = new cdk.App();

const dbStack = new DynamoDBStack(app, 'GymcoreDatabaseStack', {
  env: {
    region: "eu-central-1",
  }
})

const smsStack = new SMSQueueStack(app, 'GymcoreSMSQueueStack', {
  env: {
    region: "eu-central-1",
  }
});

new GymcoreCdkStack(app, 'DevCDKStack', {
  env: {
    region: "eu-central-1",
  },
  tenantName: "Dev_Israel",
  tenantId: "6334c862-6041-7018-7094-9d7686054bd9",
  tables: dbStack.tables,
  SMS_SENDLambda: smsStack.SMS_SENDTriggerLambda,
  SmsVerifyKmsKey: smsStack.KmsKey
});

new GymcoreCdkStack(app, 'SpinPlusCDKStack', {
  env: {
    region: "eu-central-1",
  },
  tenantName: "SpinPlus_Israel",
  tenantId: "43e48822-4001-7060-b9ed-d70b828c71e2",
  tables: dbStack.tables,
  SMS_SENDLambda: smsStack.SMS_SENDTriggerLambda,
  SmsVerifyKmsKey: smsStack.KmsKey
});

new GymcoreCdkStack(app, 'MinheletOfekCDKStack', {
  env: {
    region: "eu-central-1",
  },
  tenantName: "MinheletOfek_Israel",
  tenantId: "7364e862-8041-701a-637d-ed9bc9543cbe",
  tables: dbStack.tables,
  SMS_SENDLambda: smsStack.SMS_SENDTriggerLambda,
  SmsVerifyKmsKey: smsStack.KmsKey
});