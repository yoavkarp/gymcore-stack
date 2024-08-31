import { IClub, IQuery, IQueryGetClubByIdArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";

export const handler: AppSyncResolver<IQueryGetClubByIdArgs, IQuery['getClubById']> = async (event, context, callback) => {

    try {
        const { Item: data } = await dynamodb.get({
            TableName: "ClubTable",
            Key: {
                id: event.arguments.clubId,
                tenantId: process.env.TENANT_ID
            }
        }).promise()

        if (!data) {
            return callback(new Error(`Member with id ${event.arguments.clubId} not found`));
        }

        return callback(undefined, data as IClub)
    }
    catch (err: any) {
        return callback(err)
    }
}