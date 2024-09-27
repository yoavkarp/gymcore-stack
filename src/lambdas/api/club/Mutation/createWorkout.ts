import { IMutation, IMutationCreateWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationCreateWorkoutArgs, IMutation['createWorkout']> = async (event, context, callback) => {

    const {
        input
    } = event.arguments;

    const clubId = event.identity?.sub!;

    const Item = addCreateMetadata({
        id: randomUUID(),
        clubId,
        ...input,
        'tenantId#memberId': input.memberId ? `${process.env.TENANT_ID}#${input.memberId}` : undefined
    }, clubId)

    // define username
    const { Attributes } = await dynamodb.put({
        TableName: "WorkoutTable",
        Item
    }).promise()

    return callback(undefined, Item);

}