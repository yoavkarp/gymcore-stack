import { QuerySearchMembersArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../appsync.types";
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const searchMembers: AppSyncResolver<QuerySearchMembersArgs> = async (event, context, callback) => {
    const {
        query,
        limit
    } = event.arguments;

    const { Items } = await dynamodb.scan({
        TableName: process.env.MembersTableName!,
        Limit: limit || 10,
        FilterExpression: "contains(#name, :query) OR contains(#email, :query) OR contains(#phoneNumber, :query)",
        ExpressionAttributeNames: {
            "#name": "name",
            "#email": "email",
            "#phoneNumber": "phoneNumber"
        },
        ExpressionAttributeValues: {
            ":query": query
        }
    }).promise()

    return callback(undefined, Items)
}