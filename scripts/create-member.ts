import AWS from 'aws-sdk'
import aws_exports from '../auth-client/aws-exports';

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "yoav" })
AWS.config.region = "eu-central-1"

const dynamodb = new AWS.DynamoDB.DocumentClient()
const cognito = new AWS.CognitoIdentityServiceProvider()

const createMember = async ({ phone_number, tenantId }: { phone_number: string, tenantId: string }) => {

    // define username
    const Username = phone_number;

    const { User: user } = await cognito.adminCreateUser({
        UserPoolId: aws_exports.Auth.Cognito.userPoolId,
        Username: phone_number.substring(4),
        TemporaryPassword: "Abcd1234!@",
        UserAttributes: [
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

createMember({ phone_number: "+9720505716745", tenantId: "d4258a0f-85a5-4c0b-b95a-f9c861e0a00c" })