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
  tenantId: "23b498e2-f0c1-7047-3bd1-a9fe0cd7f383",
  tables: dbStack.tables,
  SMS_SENDLambda: smsStack.SMS_SENDTriggerLambda,
  SmsVerifyKmsKey: smsStack.KmsKey
});