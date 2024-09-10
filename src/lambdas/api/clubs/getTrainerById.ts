import { IMember, IQuery, IQueryGetMemberByIdArgs, IQueryGetTrainerByIdArgs, ITrainer } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";

export const handler: AppSyncResolver<IQueryGetTrainerByIdArgs, IQuery['getTrainerById']> = async (event, context, callback) => {

    try {
        const { Item: data } = await dynamodb.get({
            TableName: "TrainerTable",
            Key: {
                id: event.arguments.trainerId,
                tenantId: process.env.TENANT_ID
            }
        }).promise()

        if (!data) {
            return callback(new Error(`Member with id ${event.arguments.trainerId} not found`));
        }

        return callback(undefined, data as ITrainer)
    }
    catch (err: any) {
        return callback(err)
    }
}