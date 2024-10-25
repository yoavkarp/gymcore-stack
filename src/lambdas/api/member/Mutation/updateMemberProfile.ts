import { IMutation, IMutationUpdateMemberProfileArgs, IMutationCreateMemberArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationUpdateMemberProfileArgs, IMutation['updateMemberProfile']> = async (event, context, callback) => {

    const {
        input,
    } = event.arguments;

    const memberId = event.identity?.sub!

    // define username
    const payload = input;

    const { Attributes } = await dynamodb.update({
        TableName: "MemberTable",
        UpdateExpression: `SET ${Object.keys(payload).map(key => `#${key} = :${key}`).join(", ")}`,
        ExpressionAttributeValues: Object.keys(payload).reduce<Record<string, any>>((acc, key) => {
            acc[`:${key}`] = payload[key as keyof typeof payload];
            return acc;
        }, {}),
        ReturnValues: "ALL_NEW",
        ExpressionAttributeNames: Object.keys(payload).reduce<Record<string, string>>((acc, key) => {
            acc[`#${key}`] = key;
            return acc;
        }, {}),
        Key: {
            tenantId: process.env.TENANT_ID,
            id: memberId,
        },
    }).promise();

    return callback(undefined, Attributes as any);

}