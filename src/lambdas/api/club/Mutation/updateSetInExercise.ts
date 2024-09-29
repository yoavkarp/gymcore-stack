import { IExercise, IMutation, IMutationUpdateSetInExerciseArgs, IStrengthExerciseSet, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationUpdateSetInExerciseArgs, IMutation['updateSetInExercise']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
        exerciseId,
        setId
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
    const indexOfSet = existItem?.exercises[indexOfExercise].sets.findIndex((set: IStrengthExerciseSet) => set.id === setId)

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `SET ${paramsToUpdate.map((param) => `#exercises[${indexOfExercise}].#sets[${indexOfSet}].${param} = :${param}`).join(', ')}, #updated_at = :updated_at`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ...paramsToUpdate.reduce<any>((acc, param) => {
                acc[`:${param}`] = input[param as keyof typeof input]
                return acc
            }, {})
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