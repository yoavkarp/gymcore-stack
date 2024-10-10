import { IExercise, IMutation, IMutationUpdateExerciseInWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { addUpdateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationUpdateExerciseInWorkoutArgs, IMutation['updateExerciseInWorkout']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
        exerciseId,
        trainerId
    } = event.arguments;

    const clubId = event.identity?.sub!;

    const paramsToUpdate = Object.keys(input);
    if (!paramsToUpdate.length) {
        return callback(new Error('No params to update'))
    }

    const { Item: existItem } = await dynamodb.get({
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        }
    }).promise()

    const indexOfExercise = existItem?.exercises.findIndex((exercise: IExercise) => exercise.id === exerciseId)
    if (indexOfExercise === -1) {
        return callback(new Error('Exercise not found'))
    }

    const workout = existItem as IWorkout;
    if (!workout.exercises) {
        return callback(new Error('Workout has no exercises'))
    }

    const exercise = workout.exercises[indexOfExercise];

    Object.assign(exercise, input);

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `SET #exercises[${indexOfExercise}] = :newExercise, #updated_at = :updated_at, #trainerId = :trainerId`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':newExercise': exercise,
            ":trainerId": trainerId
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            '#exercises': 'exercises',
            '#trainerId': 'trainerId'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}