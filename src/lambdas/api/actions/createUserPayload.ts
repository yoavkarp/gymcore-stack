import { randomUUID } from "crypto";
import { cognito } from "../connection";

export const createUser = async (attrs: { phone_number: string, email?: string }, group: "member" | "club" | "trainer") => {
    const { phone_number, email } = attrs;
    const Username = randomUUID();

    const { User: user } = await cognito.adminCreateUser({
        UserPoolId: process.env.USER_POOL_ID,
        Username,
        TemporaryPassword: "Abcd1234!@",
        UserAttributes: [
            {
                Name: 'phone_number',
                Value: phone_number
            },
            {
                Name: "phone_number_verified",
                Value: "true"
            },
            {
                Name: 'preferred_username',
                Value: phone_number.substring(4)
            },
            {
                Name: 'custom:tenantId',
                Value: process.env.TENANT_ID
            }
        ].concat(email ? [
            {
                Name: 'email',
                Value: email
            },
            {
                Name: "email_verified",
                Value: "true"
            }
        ] : []),
    }).promise()

    await cognito.adminAddUserToGroup({
        Username,
        UserPoolId: process.env.USER_POOL_ID,
        GroupName: group
    }).promise()


    return user;

}