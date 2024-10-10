import { IMutation, IMutationAddExerciseToWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata, addUpdateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationAddExerciseToWorkoutArgs, IMutation['addExerciseToWorkout']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
        trainerId
    } = event.arguments;

    Object.assign(input, {
        __typename: input.type === "CARDIO" ? 'CardioExercise' : 'StrengthExercise',
        id: randomUUID()
    })

    const clubId = event.identity?.sub!;

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId
        },
        UpdateExpression: 'SET #exercises = list_append(if_not_exists(#exercises, :empty_list), :new_exercise), #updated_at = :updated_at, #trainerId = :trainerId',
        ExpressionAttributeValues: {
            ':new_exercise': [input], // Replace with the new friend ID
            ':empty_list': [], // Handles the case where the 'friends' attribute doesn't exist
            ':updated_at': new Date().toISOString(),
            ':trainerId': trainerId
        },
        ExpressionAttributeNames: {
            '#updated_at': 'updated_at',
            "#exercises": "exercises",
            '#trainerId': 'trainerId'
        },
        ReturnValues: 'ALL_NEW', // Returns the updated attributes
    };

    // define username
    const { Attributes } = await dynamodb.update(Item).promise()

    return callback(undefined, Attributes as IWorkout);

}