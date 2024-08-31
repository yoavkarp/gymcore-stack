import { IClub, IQuery } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";

export const handler: AppSyncResolver<undefined, IQuery['getAuthenticatedClub']> = async (event, context, callback) => {

    try {
        const { Item: data } = await dynamodb.get({
            TableName: "ClubTable",
            Key: {
                id: event.identity?.sub,
                tenantId: process.env.TENANT_ID
            }
        }).promise()

        if (!data) {
            return callback(new Error(`Club with id ${event.identity?.sub} not found`));
        }

        return callback(undefined, data as IClub)
    }
    catch (err: any) {
        return callback(err)
    }
}