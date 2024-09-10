import { IGoal, IMutation, IMutationCreateGoalArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationCreateGoalArgs, IMutation['createGoal']> = async (event, context, callback) => {

    const { input } = event.arguments;
    const isClub = event.identity?.groups?.includes("club");
    const memberId = isClub ? input.memberId : event.identity?.sub

    if (!memberId) {
        return callback(new Error("MemberId is required"))
    }

    const { Item: memberDoc } = await dynamodb.get({
        TableName: "MemberTable",
        Key: {
            id: memberId,
            tenantId: process.env.TENANT_ID
        }
    }).promise()

    if (!memberDoc) {
        return callback(new Error(`Member with id ${input.memberId} not found`));
    }

    const goalItem = {
        id: randomUUID(),
        "tenantId#memberId": `${process.env.TENANT_ID}#${memberId}`,
        tenantId: process.env.TENANT_ID,
        memberId: memberId,
        clubId: event.identity?.groups?.includes("club") ? event.identity.sub : undefined,
        weight: input.weight,
        height: input.height,
        heart_rate: input.heart_rate,
        fat: input.fat,
        title: input.title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }

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