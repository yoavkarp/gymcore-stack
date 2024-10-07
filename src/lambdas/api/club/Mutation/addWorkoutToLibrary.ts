import { IMutation, IMutationAddWorkoutToLibraryArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationAddWorkoutToLibraryArgs, IMutation['addWorkoutToLibrary']> = async (event, context, callback) => {

    const {
        workoutId
    } = event.arguments;

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
    };

    // define username
    const { Item: workoutToAdd } = await dynamodb.get(Item).promise()

    if (!workoutToAdd) {
        return callback(new Error('Workout not found'))
    }

    delete workoutToAdd.memberId

    Object.assign(workoutToAdd, {
        id: randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });

    const { Attributes } = await dynamodb.put({
        TableName: "LibraryTable",
        Item: workoutToAdd,
        ConditionExpression: 'attribute_not_exists(id)'
    }).promise()

    return callback(undefined, workoutToAdd as IWorkout);

}