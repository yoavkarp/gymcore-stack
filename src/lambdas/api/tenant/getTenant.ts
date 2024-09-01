import { IQuery, ITenant } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";

export const handler: AppSyncResolver<undefined, IQuery['getTenant']> = async (event, context, callback) => {

    try {
        const { Item: data } = await dynamodb.get({
            TableName: "TenantTable",
            Key: {
                id: process.env.TENANT_ID,
            }
        }).promise()

        if (!data) {
            return callback(new Error(`Tenant not found`));
        }

        return callback(undefined, data as ITenant)
    }
    catch (err: any) {
        return callback(err)
    }
}