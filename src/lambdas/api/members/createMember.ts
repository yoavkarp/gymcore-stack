import { IMember, IMutation, IMutationCreateMemberArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import { cognito, dynamodb } from "../connection";
import { randomUUID } from "crypto";
import { CognitoIdentityServiceProvider, AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";

export const handler: AppSyncResolver<IMutationCreateMemberArgs> = async (event, context, callback) => {

    const {
        input: {
            phone_number
        }
    } = event.arguments;

    // define username
    const Username = phone_number;

    const exists = await cognito.listUsers({
        UserPoolId: process.env.USER_POOL_ID,
        Filter: `phone_number = "${phone_number}"`
    }).promise()

    let user: UserType | undefined = exists.Users?.[0];

    if (!user) {

        let user = (await cognito.adminCreateUser({
            UserPoolId: process.env.USER_POOL_ID,
            Username,
            TemporaryPassword: "12345678",
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
        }).promise()).User

        await cognito.adminAddUserToGroup({
            Username,
            UserPoolId: process.env.USER_POOL_ID,
            GroupName: "member"
        }).promise()

        const memberItem = {
            id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
            tenantId: process.env.TENANT_ID,
            phone_number,
            created_at: user?.UserCreateDate,
            updated_at: user?.UserCreateDate
        }

        await dynamodb.put({
            TableName: "MemberTable",
            Item: memberItem,
            ConditionExpression: "attribute_not_exists(id)"
        }).promise()

        return callback(undefined, memberItem)

    }

    const { Item } = await dynamodb.get({
        TableName: "MemberTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value
        }
    }).promise()

    if (Item) {
        return callback(new Error("err-user-already-a-member"), Item)
    }
    else {

        await cognito.adminAddUserToGroup({
            Username,
            UserPoolId: process.env.USER_POOL_ID,
            GroupName: "member"
        }).promise()

        const memberItem = {
            id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
            tenantId: process.env.TENANT_ID,
            phone_number,
            created_at: user?.UserCreateDate,
            updated_at: user?.UserCreateDate
        }

        await dynamodb.put({
            TableName: "MemberTable",
            Item: memberItem,
            ConditionExpression: "attribute_not_exists(id)"
        }).promise()

        return callback(undefined, memberItem)
    }
}