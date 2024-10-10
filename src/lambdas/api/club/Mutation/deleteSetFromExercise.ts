import { IMutation, IMutationCreateWorkoutArgs, IMutationDeleteExerciseFromWorkoutArgs, IMutationDeleteSetFromExerciseArgs, IMutationDeleteWorkoutArgs, IStrengthExercise, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeleteSetFromExerciseArgs, IMutation['deleteSetFromExercise']> = async (event, context, callback) => {

    const {
        workoutId,
        exerciseId,
        setId,
        trainerId
    } = event.arguments;

    const { Item: prevItem } = await dynamodb.get({
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        }
    }).promise()

    const prev = prevItem as IWorkout;
    const exerciseIndex = prev.exercises?.findIndex((exercise) => exercise.id === exerciseId);

    if (typeof (exerciseIndex) !== 'number' || exerciseIndex === -1) {
        return callback(new Error('Exercise not found'))
    }

    const setIndex = (prev.exercises?.[exerciseIndex] as IStrengthExercise).sets?.findIndex((set) => set?.id === setId);

    if (typeof (setIndex) !== 'number' || setIndex === -1) {
        return callback(new Error('Set not found'))
    }

    // define username
    const { Attributes } = await dynamodb.update({
        TableName: "WorkoutTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `REMOVE #exercises[${exerciseIndex}].#sets[${setIndex}] SET #updated_at = :updated_at, #trainerId = :trainerId`, // Replace '2' with the index of the item to remove
        ExpressionAttributeNames: {
            "#exercises": "exercises",
            "#sets": "sets",
            '#updated_at': 'updated_at',
            '#trainerId': 'trainerId'
        },
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':trainerId': trainerId
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    }).promise()

    return callback(undefined, Attributes as IWorkout);

}