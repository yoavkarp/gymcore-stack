import { IMutation, IMutationCreateWorkoutArgs, IMutationDeleteExerciseFromWorkoutArgs, IMutationDeleteWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeleteExerciseFromWorkoutArgs, IMutation['deleteExerciseFromWorkout']> = async (event, context, callback) => {

    const {
        workoutId,
        exerciseId,
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
    const exerciseIndex = prev.exercises?.findIndex((exercise) => exercise.id === exerciseId)

    // define username
    const { Attributes } = await dynamodb.update({
        TableName: "WorkoutTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `REMOVE exercises[${exerciseIndex}] SET #trainerId = :trainerId`, // Replace '2' with the index of the item to remove
        ExpressionAttributeValues: {
            ':trainerId': trainerId
        },
        ExpressionAttributeNames: {
            '#trainerId': 'trainerId'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes      
    }).promise()

    return callback(undefined, Attributes as IWorkout);

}