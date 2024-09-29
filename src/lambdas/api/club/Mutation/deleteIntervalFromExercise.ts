import { ICardioExercise, IMutation, IMutationCreateWorkoutArgs, IMutationDeleteExerciseFromWorkoutArgs, IMutationDeleteIntervalFromExerciseArgs, IMutationDeleteSetFromExerciseArgs, IMutationDeleteWorkoutArgs, IStrengthExercise, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeleteIntervalFromExerciseArgs, IMutation['deleteIntervalFromExercise']> = async (event, context, callback) => {

    const {
        workoutId,
        exerciseId,
        intervalId
    } = event.arguments;

    const { Item: prevItem } = await dynamodb.get({
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        }
    }).promise()

    const prev = prevItem as IWorkout;
    const exerciseIndex = prev.exercises?.findIndex((exercise) => exercise.id === exerciseId) || -1;
    const intervalIndex = (prev.exercises?.[exerciseIndex] as ICardioExercise).intervals?.findIndex((interval) => interval?.id === intervalId) || -1;

    // define username
    const { Attributes } = await dynamodb.update({
        TableName: "WorkoutTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `REMOVE exercises[${exerciseIndex}].intervals[${intervalIndex}], SET #updated_at = :updated_at`, // Replace '2' with the index of the item to remove
        ReturnValues: 'ALL_NEW', // Returns the updated attributes      
    }).promise()

    return callback(undefined, Attributes as IWorkout);

}