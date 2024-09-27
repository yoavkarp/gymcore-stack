import { IMutation, IMutationUpdateWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationUpdateWorkoutArgs, IMutation['updateWorkout']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
    } = event.arguments;

    const paramsToUpdate = Object.keys(input);

    if (!paramsToUpdate.length) {
        return callback(new Error('No params to update'))
    }

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: `SET ${paramsToUpdate.map((param) => `#${param} = :${param}`).join(', ')}, #updated_at = :updated_at`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ...paramsToUpdate.reduce<any>((acc, param) => {
                acc[`:${param}`] = input[param as keyof typeof input]
                return acc
            }, {})
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            ...paramsToUpdate.reduce<any>((acc, param) => {
                acc[`#${param}`] = param
                return acc
            }, {})
        },
        ReturnValues: 'UPDATED_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}