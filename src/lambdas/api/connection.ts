import AWS from "aws-sdk";

const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamodb = new AWS.DynamoDB.DocumentClient();

export {
    cognito,
    dynamodb
}