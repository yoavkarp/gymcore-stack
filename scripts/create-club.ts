import AWS from 'aws-sdk'
import { cognito } from '../auth-client/cognito';
import { cognitoisp } from '../aws-providers/cognito-isp';
import { dynamodb } from '../aws-providers/dynamodb-client'
import aws_exports from '../auth-client/aws-exports';
import { randomUUID } from 'crypto';

export const createClub = async (
    tenantId: string,
    clubName: string,
    phoneNumber: string,
    email: string
) => {
    try {
        const { User: user } = await cognitoisp.adminCreateUser({
            Username: randomUUID(),
            UserPoolId: aws_exports.Auth.Cognito.userPoolId,
            TemporaryPassword: "Abcd1234!@",
            UserAttributes: [
                {
                    Name: 'phone_number',
                    Value: `+972${phoneNumber}`
                },
                {
                    Name: "phone_number_verified",
                    Value: "true"
                },
                {
                    Name: "email",
                    Value: email
                },
                {
                    Name: 'preferred_username',
                    Value: phoneNumber
                },
                {
                    Name: 'custom:tenantId',
                    Value: tenantId
                },
                {
                    Name: "email_verified",
                    Value: "true"
                },
                {
                    Name: "name",
                    Value: clubName
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
                tenantId: tenantId,
                id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
                name: clubName,
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

    await cognito.login(`+972${phoneNumber}`, "Abcd1234!@")
}