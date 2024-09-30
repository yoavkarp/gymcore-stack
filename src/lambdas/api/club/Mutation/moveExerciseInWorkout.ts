import { IMutation, IMutationMoveExerciseInWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationMoveExerciseInWorkoutArgs, IMutation['moveExerciseInWorkout']> = async (event, context, callback) => {

    const {
        from,
        to,
        workoutId,
    } = event.arguments;

    if (from < 0 || to < 0 || from === to) {
        return callback(new Error('Invalid index'))
    }

    const { Item: existItem } = await dynamodb.get({
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        }
    }).promise()

    const workout = existItem as IWorkout;
    if (!workout.exercises) {
        return callback(new Error('Workout has no exercises'))
    }

    const exercises = workout.exercises;
    const move = exercises.splice(from, 1);
    exercises.splice(to, 0, ...move);

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `SET #exercises = :exercises, #updated_at = :updated_at`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':exercises': exercises
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            '#exercises': 'exercises'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}