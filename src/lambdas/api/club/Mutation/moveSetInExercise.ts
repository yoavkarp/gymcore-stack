import { IMutation, IMutationMoveExerciseInWorkoutArgs, IMutationMoveSetInExerciseArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationMoveSetInExerciseArgs, IMutation['moveSetInExercise']> = async (event, context, callback) => {

    const {
        from,
        to,
        workoutId,
        exerciseId
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

    const exerciseIndex = workout.exercises.findIndex((ex) => ex.id === exerciseId);

    if (exerciseIndex === -1) {
        return callback(new Error('Exercise not found'))
    }

    const exercise = workout.exercises[exerciseIndex];

    if (exercise?.__typename !== "StrengthExercise") return callback(new Error('Exercise is not a StrengthExercise'));
    if (!exercise.sets) return callback(new Error('Exercise has no sets'));

    const sets = exercise.sets;
    const move = sets.splice(from, 1);
    sets.splice(to, 0, ...move);


    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `SET #exercises[${exerciseIndex}].#sets = :new_sets, #updated_at = :updated_at`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':new_sets': sets
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            '#exercises': 'exercises',
            '#sets': 'sets'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}