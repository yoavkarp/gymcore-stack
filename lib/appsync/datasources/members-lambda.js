"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_logs_1 = require("aws-cdk-lib/aws-logs");
const path_1 = __importDefault(require("path"));
const members = (scope, layers, tenantId) => new aws_lambda_1.Function(scope, `Members_${tenantId}`, {
    functionName: `Members_${tenantId}`,
    runtime: aws_lambda_1.Runtime.NODEJS_18_X,
    handler: 'index.main',
    code: aws_lambda_1.Code.fromAsset(path_1.default.join(__dirname, "..", "..", "lambdas", 'AppSync.Members')),
    layers,
    environment: {
        tenantId
    },
    logRetention: aws_logs_1.RetentionDays.ONE_MONTH,
});
exports.default = members;
