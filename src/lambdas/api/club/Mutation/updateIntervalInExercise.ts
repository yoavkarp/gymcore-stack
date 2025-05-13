import { IExercise, IMutation, IMutationUpdateIntervalInExerciseArgs, ICardioExercise, IWorkout, ICardioExerciseInterval } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationUpdateIntervalInExerciseArgs, IMutation['updateIntervalInExercise']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
        exerciseId,
        intervalId,
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
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        }
    }).promise()

    const indexOfExercise = existItem?.exercises.findIndex((exercise: IExercise) => exercise.id === exerciseId)
    const indexOfInterval = existItem?.exercises[indexOfExercise].intervals.findIndex((interval: ICardioExerciseInterval) => interval.id === intervalId)

    Object.assign(input, { id: intervalId });

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        },
        UpdateExpression: `SET #exercises[${indexOfExercise}].intervals[${indexOfInterval}] = :new_interval, #updated_at = :updated_at, #trainerId = :trainerId`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':new_interval': input,
            ':trainerId': trainerId
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            "#exercises": "exercises",
            '#trainerId': 'trainerId',
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}