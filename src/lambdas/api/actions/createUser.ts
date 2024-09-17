import { randomUUID } from "crypto";
import { cognito } from "../connection";

export const createUser = async (phone_number: string, group: "member" | "club") => {
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
            }
        ]
    }).promise()

    await cognito.adminAddUserToGroup({
        Username,
        UserPoolId: process.env.USER_POOL_ID,
        GroupName: group
    }).promise()

    return user;

}