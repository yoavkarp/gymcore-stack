import { IGoal, IMutation, IMutationCreateGoalArgs, IMutationUpdateGoalArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationUpdateGoalArgs, IMutation['updateGoal']> = async (event, context, callback) => {

    const { goalId, input: { memberId: inputMemberId, ...input } } = event.arguments;
    const isClub = event.identity?.groups?.includes("club");
    const memberId = isClub ? inputMemberId : event.identity?.sub

    if (Object.keys(input).length === 0) {
        return callback(new Error("No changes provided"))
    }

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
        return callback(new Error(`Member with id ${inputMemberId} not found`));
    }

    const { Items } = await dynamodb.query({
        TableName: "GoalTable",
        IndexName: "goals-by-member-id",
        KeyConditionExpression: "#tenantId#memberIdd = :tenantId#memberId",
        ExpressionAttributeNames: {
            "#tenantId#memberId": "tenantId#memberId"
        },
        ExpressionAttributeValues: {
            ":tenantId#memberId": `${process.env.TENANT_ID}#${memberId}`
        }
    }).promise()

    const goalItem = Items?.find(item => item.id === goalId) as IGoal

    if (!goalItem) {
        return callback(new Error(`Goal with id ${goalId} not found`))
    }

    try {
        const { Attributes } = await dynamodb.update({
            TableName: "GoalTable",
            Key: {
                id: goalId,
                tenantId: process.env.TENANT_ID,
            },
            UpdateExpression: Object.keys(input).reduce((acc, key) => {
                return acc + `#${key} = :${key},`
            }, "SET ").slice(0, -1),
            ExpressionAttributeNames: Object.keys(input).reduce((acc, key) => {
                return { ...acc, [`#${key}`]: key }
            }, {}),
            ExpressionAttributeValues: Object.keys(input).reduce((acc, key) => {
                return { ...acc, [`:${key}`]: input[key as keyof typeof input] }
            }, {}),
            ReturnValues: "ALL_NEW",
        }).promise()

        return callback(undefined, Attributes as IGoal)
    }
    catch (e) {
        return callback(new Error(`Goal already exists for member ${memberId}`))
    }



}