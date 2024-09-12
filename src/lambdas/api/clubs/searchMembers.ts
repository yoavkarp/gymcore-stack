import { IGoal, IMutation, IMutationCreateGoalArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { cognito, dynamodb } from "../connection";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationCreateGoalArgs, IMutation['createGoal']> = async (event, context, callback) => {

    const { Item: memberDoc } = await dynamodb.get({
        TableName: "MemberTable",
        Key: {
            id: memberId,
            tenantId: process.env.TENANT_ID
        }
    }).promise()

    const { Users } = await cognito.listUsers({
        Filter: `phone_number ^= \"${phone_number}\"`,
        UserPoolId: process.env.USER_POOL_ID,
        Limit: 3
    }).promise();

    const { Items } = await dynamodb.query({
        TableName: "GoalTable",
        IndexName: "goals-by-member-id",
        KeyConditionExpression: "#tenantId_memberId = :tenantId_memberId",
        ExpressionAttributeNames: {
            "#tenantId_memberId": "tenantId#memberId"
        },
        ExpressionAttributeValues: {
            ":tenantId_memberId": `${process.env.TENANT_ID}#${memberId}`
        }
    }).promise()

    const goalItemExists = Items?.find(item => Boolean(item.completed) === false) as IGoal

    if (goalItemExists) {
        return callback(new Error(`Goal already exists for member ${memberId}`))
    }

    await dynamodb.put({
        TableName: "GoalTable",
        Item: goalItem,
    }).promise()

    return callback(undefined, goalItem as IGoal)

}