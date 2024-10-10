import { IMutation, IMutationCreateEventArgs, IEvent } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationCreateEventArgs, IMutation['createEvent']> = async (event, context, callback) => {

    const {
        input
    } = event.arguments;

    const clubId = event.identity?.sub!;

    const { Item: plan } = await dynamodb.get({
        TableName: 'PlanTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: input.planId
        }
    }).promise()

    if (!plan) {
        return callback(new Error('Plan not found'))
    }

    const Item = addCreateMetadata({
        id: randomUUID(),
        clubId,
        ...input,
        trainerId: plan.trainerId,
        memberId: plan.memberId,
        'tenantId#planId': `${process.env.TENANT_ID}#${input.planId}`
    }, clubId) satisfies IEvent

    // define username
    const { Attributes } = await dynamodb.put({
        TableName: "EventTable",
        Item
    }).promise()

    return callback(undefined, Item);

}