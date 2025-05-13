import AWS from 'aws-sdk'
import aws_exports, { STACK_DETAILS } from '../auth-client/aws-exports';
import { randomUUID } from 'crypto';

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "pumpreact" })
AWS.config.region = "eu-central-1"

const dynamodb = new AWS.DynamoDB.DocumentClient()
const cognito = new AWS.CognitoIdentityServiceProvider()

const tenantId = STACK_DETAILS.tenantId;

const createMember = async ({ phone_number }: { phone_number: string }) => {

    // define username
    const Username = phone_number;

    const { User: user } = await cognito.adminCreateUser({
        UserPoolId: aws_exports.Auth.Cognito.userPoolId,
        Username: randomUUID(),
        TemporaryPassword: "Abcd1234!@",
        UserAttributes: [
            {
                Name: 'preferred_username',
                Value: Username.substring(4)
            },
            {
                Name: 'custom:tenantId',
                Value: tenantId
            },
            {
                Name: 'phone_number',
                Value: phone_number
            },
            {
                Name: "phone_number_verified",
                Value: "true"
            }
        ]
    }).promise()

    await cognito.adminAddUserToGroup({
        Username,
        UserPoolId: aws_exports.Auth.Cognito.userPoolId,
        GroupName: "member"
    }).promise()

    const memberItem = {
        id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
        tenantId: tenantId,
        phone_number,
        created_at: user?.UserCreateDate?.toISOString(),
        updated_at: user?.UserCreateDate?.toISOString()
    }

    await dynamodb.put({
        TableName: "MemberTable",
        Item: memberItem,
        ConditionExpression: "attribute_not_exists(id)"
    }).promise()

    console.log(user?.Attributes?.find(attr => attr.Name === "sub")?.Value)

}

createMember({ phone_number: "+9720505716749" })