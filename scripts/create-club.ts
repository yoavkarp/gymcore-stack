import AWS from 'aws-sdk'
import { cognito } from '../auth-client/cognito';
import { cognitoisp } from '../aws-providers/cognito-isp';
import { dynamodb } from '../aws-providers/dynamodb-client'
import aws_exports from '../auth-client/aws-exports';

const main = async () => {
    const Username = "0501111112"
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
                    Name: "email",
                    Value: "club@club.com"
                },
                {
                    Name: "email_verified",
                    Value: "true"
                },
                {
                    Name: "name",
                    Value: "Dev Club"
                },
                {
                    Name: "birthdate",
                    Value: "1990-01-01"
                }
            ]
        }).promise()

        await cognitoisp.adminAddUserToGroup({
            Username: user?.Username!,
            GroupName: "club",
            UserPoolId: aws_exports.Auth.Cognito.userPoolId
        }).promise()

        await dynamodb.put({
            TableName: "ClubTable",
            Item: {
                tenantId: "6334c862-6041-7018-7094-9d7686054bd9",
                id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
                name: "Dev Club",
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
        console.error(e)
    }

    await cognito.login(`+972${Username}`, "Abcd1234!@")
}

main();