#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { GymcoreCdkStack } = require('../lib/stack');

const app = new cdk.App();
new GymcoreCdkStack(app, 'GymcoreCdkStack', {
  env: {
    region: "eu-central-1"
  }
});
