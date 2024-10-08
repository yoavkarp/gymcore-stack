import { IMutation, IMutationCreateWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationCreateWorkoutArgs, IMutation['createWorkout']> = async (event, context, callback) => {

    const {
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
    }, clubId)

    if (library) {
        Object.assign(Item, {
            "tenantId#clubId#lib": `${process.env.TENANT_ID}#${clubId}#1`,
            library: true
        });
    }

    if (input.memberId) {
        Object.assign(Item, {
            "tenantId#memberId": `${process.env.TENANT_ID}#${input.memberId}`,
        });
    }

    // define username
    const { Attributes } = await dynamodb.put({
        TableName: "WorkoutTable",
        Item
    }).promise()

    return callback(undefined, Item);

}