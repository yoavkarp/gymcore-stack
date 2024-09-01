import { IMember, IQuery, IQueryGetMemberByIdArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";

export const handler: AppSyncResolver<IQueryGetMemberByIdArgs, IQuery['getMemberById']> = async (event, context, callback) => {

    try {
        const { Item: data } = await dynamodb.get({
            TableName: "MemberTable",
            Key: {
                id: event.arguments.memberId,
                tenantId: process.env.TENANT_ID
            }
        }).promise()

        if (!data) {
            return callback(new Error(`Member with id ${event.arguments.memberId} not found`));
        }

        return callback(undefined, data as IMember)
    }
    catch (err: any) {
        return callback(err)
    }
}