import { Member, Mutation, MutationDeleteMemberArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import { cognito, dynamodb } from "../connection";

export const deleteMember: AppSyncResolver<MutationDeleteMemberArgs, Mutation['deleteMember']> = async (event, context, callback) => {
    try {
        const { Attributes: data } = await dynamodb.delete({
            Key: {
                id: event.arguments.memberId,
                tenantId: process.env.TENANT_ID
            },
            ReturnValues: "ALL_OLD",
            TableName: "MemberTable",
            ConditionExpression: "clubId = :clubId",
            ExpressionAttributeValues: {
                ":clubId": event.identity?.claims?.["custom:clubId"],
            },
            ExpressionAttributeNames: {
                "#clubId": "clubId",
            },
        }).promise()

        await cognito.adminDisableUser({
            UserPoolId: process.env.USER_POOL_ID!,
            Username: data?.phoneNumber
        }).promise()

        callback(null, data as Member)
    }
    catch (err: any) {
        callback(err)
    }

}