import AWS from 'aws-sdk'
import { cognito } from '../auth-client/cognito';
import { cognitoisp } from '../aws-providers/cognito-isp';
import aws_exports from '../auth-client/aws-exports';
import { dynamodb } from '../aws-providers/dynamodb-client';

const main = async () => {
    const Username = "0501111111"
    try {
        const { User: user } = await cognitoisp.adminCreateUser({
            Username,
            UserPoolId: aws_exports.Auth.Cognito.userPoolId,
            TemporaryPassword: "Abcd1234!@",
            UserAttributes: [
                {
                    Name: 'phone_number',
                    Value: `+972${Username}`
                },
                {
                    Name: "phone_number_verified",
                    Value: "true"
                },
                {
                    Name: "name",
                    Value: "Dev Club"
                },
                {
                    Name: "email",
                    Value: "tenant@tenant.com"
                },
                {
                    Name: "email_verified",
                    Value: "true"
                }
            ]
        }).promise()

        await dynamodb.put({
            TableName: "TenantTable",
            Item: {
                id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
                name: "Dev Tenant",
                ...user?.Attributes?.reduce((acc, attr) => {
                    return { ...acc, [attr.Name]: attr.Value }
                }, {}),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            ConditionExpression: "attribute_not_exists(id)"
        }).promise()
    }
    catch (e) {
        console.log(e)
    }



    await cognito.login(`+972${Username}`, "Abcd1234!@")
}

main();