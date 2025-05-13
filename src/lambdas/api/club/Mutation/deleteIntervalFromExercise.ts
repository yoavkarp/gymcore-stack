import { ICardioExercise, IMutation, IMutationCreateWorkoutArgs, IMutationDeleteExerciseFromWorkoutArgs, IMutationDeleteIntervalFromExerciseArgs, IMutationDeleteSetFromExerciseArgs, IMutationDeleteWorkoutArgs, IStrengthExercise, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeleteIntervalFromExerciseArgs, IMutation['deleteIntervalFromExercise']> = async (event, context, callback) => {

    const {
        workoutId,
        exerciseId,
        intervalId,
        trainerId
    } = event.arguments;

    const { Item: prevItem } = await dynamodb.get({
        TableName: 'WorkoutTable',
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        }
    }).promise()

    const prev = prevItem as IWorkout;
    const exerciseIndex = prev.exercises?.findIndex((exercise) => exercise.id === exerciseId) || -1;
    if (typeof (exerciseIndex) !== 'number' || exerciseIndex === -1) {
        return callback(new Error('Exercise not found'))
    }

    const intervalIndex = (prev.exercises?.[exerciseIndex] as ICardioExercise).intervals?.findIndex((interval) => interval?.id === intervalId);

    if (typeof (intervalIndex) !== 'number' || intervalIndex === -1) {
        return callback(new Error('Set not found'))
    }

    // define username
    const { Attributes } = await dynamodb.update({
        TableName: "WorkoutTable",
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        },
        UpdateExpression: `REMOVE exercises[${exerciseIndex}].intervals[${intervalIndex}] SET #updated_at = :updated_at, #trainerId = :trainerId`, // Replace '2' with the index of the item to remove
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':trainerId': trainerId
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            '#trainerId': 'trainerId'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes      
    }).promise()

    return callback(undefined, Attributes as IWorkout);

}