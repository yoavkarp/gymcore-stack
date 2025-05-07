import AWS from 'aws-sdk'
import { cognito } from '../auth-client/cognito';
import { cognitoisp } from '../aws-providers/cognito-isp';
import aws_exports from '../auth-client/aws-exports';
import { dynamodb } from '../aws-providers/dynamodb-client';
import { randomUUID } from 'crypto';

export const createTenant = async (
    tenantName: string,
    phoneNumber: string,
    email: string
) => {
    const PhoneNumber = phoneNumber;
    const Name = tenantName;
    const Email = email;

    let tid = "";

    try {
        const { User: user } = await cognitoisp.adminCreateUser({
            Username: randomUUID(),
            UserPoolId: aws_exports.Auth.Cognito.userPoolId,
            TemporaryPassword: "Abcd1234!@",
            UserAttributes: [
                {
                    Name: 'preferred_username',
                    Value: PhoneNumber
                },
                {
                    Name: 'phone_number',
                    Value: `+972${PhoneNumber}`
                },
                {
                    Name: "phone_number_verified",
                    Value: "true"
                },
                {
                    Name: "name",
                    Value: Name
                },
                {
                    Name: "email",
                    Value: Email
                },
                {
                    Name: "email_verified",
                    Value: "true"
                }
            ]
        }).promise()

        let tid = user?.Attributes?.find(attr => attr.Name === "sub")?.Value;

        await dynamodb.put({
            TableName: "TenantTable",
            Item: {
                id: tid,
                tenantId: tid,
                name: Name,
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

    await cognito.login(`+972${PhoneNumber}`, "Abcd1234!@")

    console.log(tid);
    return tid;
}