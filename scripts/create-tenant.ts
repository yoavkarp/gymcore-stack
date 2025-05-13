import AWS from 'aws-sdk'
import { cognito } from '../auth-client/cognito';
import { cognitoisp } from '../aws-providers/cognito-isp';
import aws_exports, { STACK_DETAILS } from '../auth-client/aws-exports';
import { dynamodb } from '../aws-providers/dynamodb-client';

export const createTenant = async (
    tenantName: string,
    phoneNumber: string,
    email: string
) => {
    const PhoneNumber = phoneNumber;
    const Name = tenantName;
    const Email = email;

    const tid = STACK_DETAILS.tenantId;

    try {
        const { User: user } = await cognitoisp.adminCreateUser({
            Username: tid,
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
                },
                {
                    Name: 'custom:tenantId',
                    Value: tid
                }
            ]
        }).promise()

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