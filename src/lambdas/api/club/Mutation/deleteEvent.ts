import { IMutation, IMutationDeleteEventArgs, IEvent } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeleteEventArgs, IMutation['createEvent']> = async (event, context, callback) => {

    const {
        eventId
    } = event.arguments;

    const { Attributes: document } = await dynamodb.delete({
        TableName: 'EventTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: eventId
        },
        ReturnValues: "ALL_OLD"
    }).promise()

    if (!document) {
        return callback(new Error('Event not found'))
    }

    return callback(undefined, document as IEvent);

}