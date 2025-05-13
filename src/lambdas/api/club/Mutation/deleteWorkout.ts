import { IMutation, IMutationCreateWorkoutArgs, IMutationDeleteWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeleteWorkoutArgs, IMutation['deleteWorkout']> = async (event, context, callback) => {

    const {
        workoutId
    } = event.arguments;

    const clubId = event.identity?.sub!;

    // define username
    const { Attributes } = await dynamodb.delete({
        TableName: "WorkoutTable",
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        },
        ReturnValues: 'ALL_OLD'
    }).promise()

    return callback(undefined, Attributes as IWorkout);

}