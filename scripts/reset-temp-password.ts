import AWS from 'aws-sdk'
import aws_exports from '../auth-client/aws-exports';

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "yoav" })
AWS.config.region = "eu-central-1"

const dynamodb = new AWS.DynamoDB.DocumentClient()
const cognito = new AWS.CognitoIdentityServiceProvider()

const username = "+9720505111113"
const password = "Abcd1234!@"
const userPoolId = aws_exports.Auth.Cognito.userPoolId
const userPoolClientId = aws_exports.Auth.Cognito.userPoolClientId


cognito.adminInitiateAuth({
    UserPoolId: userPoolId,
    ClientId: userPoolClientId,
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    AuthParameters: {
        USERNAME: username,
        PASSWORD: password
    }
}, (err, data) => {
    if (err) {
        console.log("Error", err)
    } else {
        console.log("Success", data)
    }
})