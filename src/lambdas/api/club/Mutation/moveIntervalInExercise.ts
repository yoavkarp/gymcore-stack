import { IMutation, IMutationMoveExerciseInWorkoutArgs, IMutationMoveIntervalInExerciseArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationMoveIntervalInExerciseArgs, IMutation['moveIntervalInExercise']> = async (event, context, callback) => {

    const {
        trainerId,
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
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
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

    if (exercise?.__typename !== "CardioExercise") return callback(new Error('Exercise is not a CardioExercise'));
    if (!exercise.intervals) return callback(new Error('Exercise has no intervals'));

    const intervals = exercise.intervals;
    const move = intervals.splice(from, 1);
    intervals.splice(to, 0, ...move);


    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        },
        UpdateExpression: `SET #exercises[${exerciseIndex}].#intervals = :new_intervals, #updated_at = :updated_at, #trainerId = :trainerId`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':new_intervals': intervals,
            ':trainerId': trainerId
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            '#exercises': 'exercises',
            '#intervals': 'intervals',
            '#trainerId': 'trainerId'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}