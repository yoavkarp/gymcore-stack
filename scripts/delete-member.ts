import AWS from 'aws-sdk'
import aws_exports from '../auth-client/aws-exports';

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "yoav" })
AWS.config.region = "eu-central-1"

const dynamodb = new AWS.DynamoDB.DocumentClient()
const cognito = new AWS.CognitoIdentityServiceProvider()

const deleteMember = async ({ phone_number, tenantId }: { phone_number: string, tenantId: string }) => {

    const { Username, UserAttributes } = await cognito.adminGetUser({
        UserPoolId: aws_exports.Auth.Cognito.userPoolId,
        Username: phone_number.substring(4),
    }).promise()

    const res = await cognito.adminDeleteUser({
        UserPoolId: aws_exports.Auth.Cognito.userPoolId,
        Username
    }).promise()

    await dynamodb.delete({
        TableName: "MemberTable",
        Key: {
            id: UserAttributes?.find(attr => attr.Name === "sub")?.Value,
            tenantId: tenantId
        }
    }).promise()

}

deleteMember({ phone_number: "+9720505716745", tenantId: "d4258a0f-85a5-4c0b-b95a-f9c861e0a00c" })