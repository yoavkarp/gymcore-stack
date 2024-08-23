#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { GymcoreCdkStack } = require('../lib/gymcore-stack');
const { DynamoDBStack } = require('../lib/dynamodb/dynamodb-stack');

const app = new cdk.App();

const dbStack = new DynamoDBStack(app, 'GymcoreDatabaseStack', {
  env: {
    region: "eu-central-1",
  }
})

new GymcoreCdkStack(app, 'HolmesPlaceIsraelCDKStack', {
  env: {
    region: "eu-central-1",
  },
  tenantName: "HolmesPlace_Israel",
  tenantId: "d53e40e2-555a-47e0-9193-eedefb739bea",
  databaseStack: dbStack,
  tables: dbStack.tables
});

new GymcoreCdkStack(app, 'DevCDKStack', {
  env: {
    region: "eu-central-1",
  },
  tenantName: "Dev_Israel",
  tenantId: "d4258a0f-85a5-4c0b-b95a-f9c861e0a00c",
  databaseStack: dbStack,
  tables: dbStack.tables
});