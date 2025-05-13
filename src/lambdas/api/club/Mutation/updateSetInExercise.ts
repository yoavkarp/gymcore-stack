import { IExercise, IMutation, IMutationUpdateSetInExerciseArgs, IStrengthExerciseSet, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationUpdateSetInExerciseArgs, IMutation['updateSetInExercise']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
        exerciseId,
        setId,
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
    const indexOfSet = existItem?.exercises[indexOfExercise].sets.findIndex((set: IStrengthExerciseSet) => set.id === setId)

    Object.assign(input, { id: setId });
    delete input.times;

    input.dropsets = input.dropsets?.map((ds) => ({
        ...ds,
        id: ds.id || randomUUID()
    }))


    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        },
        UpdateExpression: `SET #exercises[${indexOfExercise}].#sets[${indexOfSet}] = :new_set, #updated_at = :updated_at, #trainerId = :trainerId`,
        ExpressionAttributeValues: {
            ':updated_at': new Date().toISOString(),
            ':new_set': input,
            ':trainerId': trainerId
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            "#exercises": "exercises",
            '#sets': 'sets',
            '#trainerId': 'trainerId'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}