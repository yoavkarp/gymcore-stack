import { IMember, IQuery, IQueryGetMemberByIdArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";

export const handler: AppSyncResolver<undefined, IQuery['getAuthenticatedMember']> = async (event, context, callback) => {

    try {
        const { Item: data } = await dynamodb.get({
            TableName: "MemberTable",
            Key: {
                id: event.identity?.sub,
                tenantId: process.env.TENANT_ID
            }
        }).promise()

        if (!data) {
            return callback(new Error(`Member with id ${event.identity?.sub} not found`));
        }

        return callback(undefined, data as IMember)
    }
    catch (err: any) {
        return callback(err)
    }
}