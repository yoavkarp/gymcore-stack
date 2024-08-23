import { Member, Mutation, MutationCreateMemberArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import { cognito, dynamodb } from "../connection";
import { randomUUID } from "crypto";
import { CognitoIdentityServiceProvider, AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";

export const createMember: AppSyncResolver<MutationCreateMemberArgs> = async (event, context, callback) => {

    const {
        input: {
            email,
            name,
            phoneNumber
        }
    } = event.arguments;

    // define username
    const Username = email;

    const exists = await cognito.listUsers({
        UserPoolId: process.env.USER_POOL_ID!,
        Filter: `phone_number = "${phoneNumber}" or email = "${email}"`
    }).promise()

    let user: UserType | undefined = exists.Users?.[0];

    if (!user) {

        let user = (await cognito.adminCreateUser({
            UserPoolId: process.env.USER_POOL_ID!,
            Username,
            TemporaryPassword: "12345678",
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                },
                {
                    Name: 'phone_number',
                    Value: phoneNumber
                },
                {
                    Name: 'name',
                    Value: name
                },
                {
                    Name: "email_verified",
                    Value: "true"
                },
                {
                    Name: "phone_number_verified",
                    Value: "true"
                }
            ]
        }).promise()).User

        await cognito.adminAddUserToGroup({
            Username,
            UserPoolId: process.env.USER_POOL_ID!,
            GroupName: "member"
        }).promise()

        const userId = user?.Attributes?.find(attr => attr.Name === "sub")?.Value;

        const memberItem = {
            id: randomUUID(),
            userId,
            tenantId: process.env.TENANT_ID,
            clubId: event.identity?.claims?.["custom:clubId"],
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const userItem = {
            id: userId,
            email,
            name,
            phoneNumber,
            tenantId: process.env.TENANT_ID,
            createdAt: user?.UserCreateDate,
        }

        await dynamodb.transactWrite({
            TransactItems: [
                {
                    Put: {
                        TableName: "UserTable",
                        Item: userItem,
                        ConditionExpression: "attribute_not_exists(id)"
                    }
                },
                {
                    Put: {
                        TableName: "MemberTable",
                        Item: memberItem,
                        ConditionExpression: "attribute_not_exists(id)"
                    }
                }
            ]
        }).promise()

        return callback(undefined, memberItem)

    }

    const userId = user?.Attributes?.find(attr => attr.Name === "sub")?.Value;

    const { Items } = await dynamodb.query({
        IndexName: "members-by-tenant-id",
        TableName: "MemberTable",
        KeyConditionExpression: "tenantId = :tenantId and userId = :userId",
        ExpressionAttributeValues: {
            ":tenantId": process.env.TENANT_ID,
            ":userId": userId
        }
    }).promise()

    if (Items?.length) {
        return callback(undefined, Items[0])
    }
    else {
        return callback(new Error("User exists but not a member"))
    }




}