import { QueryGetMemberByIdArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getCurrentMember: AppSyncResolver<undefined> = async (event, context, callback) => {

    const id = event.identity?.sub!;

    const { Item: UserItem } = await dynamodb.get({
        TableName: process.env.MembersTableName!,
        Key: {
            id,
            tenantId: process.env.TENANT_ID
        }
    }).promise()

    if (!UserItem) {
        return callback(new Error(`Member with id ${id} not found`));
    }

    return callback(undefined, UserItem)
}