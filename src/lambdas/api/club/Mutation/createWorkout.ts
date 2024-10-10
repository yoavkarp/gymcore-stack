import { IMutation, IMutationCreateWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationCreateWorkoutArgs, IMutation['createWorkout']> = async (event, context, callback) => {

    const {
        trainerId,
        input: {
            library,
            ...input
        },
    } = event.arguments;

    const clubId = event.identity?.sub!;

    const Item = addCreateMetadata({
        id: randomUUID(),
        clubId,
        ...input,
        trainerId,
        library,
        "tenantId#clubId#lib": library ? `${process.env.TENANT_ID}#${clubId}#1` : undefined,
        'tenantId#memberId': input.memberId ? `${process.env.TENANT_ID}#${input.memberId}` : undefined,
        'tenantId#planId': input.planId ? `${process.env.TENANT_ID}#${input.planId}` : undefined,
    }, clubId)

    // define username
    const { Attributes } = await dynamodb.put({
        TableName: "WorkoutTable",
        Item
    }).promise()

    return callback(undefined, Item);

}