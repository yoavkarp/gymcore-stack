import { IExercise, IMutation, IMutationAddExerciseToWorkoutArgs, IMutationAddSetToExerciseArgs, IMutationCreateWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata, addUpdateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationAddSetToExerciseArgs, IMutation['addSetToExercise']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
        exerciseId
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

    Object.assign(input, { id: randomUUID() })

    const indexOfExercise = existItem?.exercises.findIndex((exercise: IExercise) => exercise.id === exerciseId)

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `SET #exercises[${indexOfExercise}].#sets = list_append(if_not_exists(#exercises[${indexOfExercise}].#sets, :empty_list), :new_set), #updated_at = :updated_at`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':new_set': [input], // Replace with the new friend ID,
            ':empty_list': [], // Handles the case where the 'friends' attribute doesn't exist
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            "#exercises": "exercises",
            '#sets': 'sets'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);


}