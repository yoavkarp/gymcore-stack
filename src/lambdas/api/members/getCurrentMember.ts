import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";

export const getCurrentMember: AppSyncResolver<undefined> = async (event, context, callback) => {

    const id = event.identity?.sub!;

    try {
        const { Item: data } = await dynamodb.get({
            TableName: process.env.MembersTableName!,
            Key: {
                id,
                tenantId: process.env.TENANT_ID
            }
        }).promise()

        if (!data) {
            return callback(new Error(`Not found`));
        }

        return callback(undefined, data)
    }
    catch (err: any) {
        return callback(err)
    }
}