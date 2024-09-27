import { IMutation, IMutationCreateWorkoutArgs, IMutationDeleteExerciseFromWorkoutArgs, IMutationDeleteSetFromExerciseArgs, IMutationDeleteWorkoutArgs, IStrengthExercise, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeleteSetFromExerciseArgs, IMutation['deleteSetFromExercise']> = async (event, context, callback) => {

    const {
        workoutId,
        exerciseId,
        setId
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
    const setIndex = (prev.exercises?.[exerciseIndex] as IStrengthExercise).sets?.findIndex((set) => set?.id === setId) || -1;

    // define username
    const { Attributes } = await dynamodb.update({
        TableName: "WorkoutTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `REMOVE exercises[${exerciseIndex}].sets[${setIndex}]`, // Replace '2' with the index of the item to remove
        ReturnValues: 'UPDATED_NEW', // Returns the updated attributes      
    }).promise()

    return callback(undefined, Attributes as IWorkout);

}