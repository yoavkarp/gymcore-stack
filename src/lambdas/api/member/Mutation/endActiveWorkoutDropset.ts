import { IMutation, IMutationStartActiveWorkoutArgs, IActiveWorkout, IActiveStrengthExerciseSet, IMutationEndActiveWorkoutDropsetArgs, IActiveExercise, IActiveCardioExercise, IActiveCardioExerciseInterval, IActiveStrengthExerciseDropSet } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { addCreateMetadata } from "../../actions/addMetadata";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationEndActiveWorkoutDropsetArgs, IMutation['endActiveWorkoutDropset']> = async (event, context, callback) => {

    const { input: { exerciseId, setId, dropsetId, ...input } } = event.arguments;

    const paramsToUpdate = Object.keys(input);
    if (!paramsToUpdate.length) {
        return callback(new Error('No params to update'))
    }

    const activeWorkout = await dynamodb.query({
        TableName: "ActiveWorkoutTable",
        IndexName: "active-workouts-by-member-id",
        KeyConditionExpression: "#PK = :PK",
        ExpressionAttributeValues: {
            ":PK": `${process.env.TENANT_ID}#${event.identity?.sub}`
        },
        ExpressionAttributeNames: {
            "#PK": "tenantId#memberId"
        },
        FilterExpression: "attribute_not_exists(end_at)",
    }).promise()

    if (!activeWorkout.Items?.length) {
        return callback(new Error("Active workout not found"))
    }

    const existItem = activeWorkout.Items![0];

    const indexOfExercise = existItem?.exercises.findIndex((exercise: IActiveExercise) => exercise.id === exerciseId)
    const indexOfSet = existItem?.exercises[indexOfExercise].sets.findIndex((set: IActiveStrengthExerciseSet) => set.id === setId)
    const indexOfDropset = existItem?.exercises[indexOfExercise].sets[indexOfSet].dropsets.findIndex((dropset: IActiveStrengthExerciseDropSet) => dropset.id === dropsetId)

    const dropset = existItem?.exercises[indexOfExercise].sets[indexOfDropset].dropsets[indexOfDropset];
    dropset.end_at = new Date().toISOString();

    Object.keys(input).forEach(key => {
        dropset[key].done = input[key as keyof typeof input]
        dropset[key].end_at = new Date().toISOString()
    })

    const updatedActiveWorkout = await dynamodb.update({
        TableName: "ActiveWorkoutTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: existItem.id
        },
        UpdateExpression: `SET exercises[${indexOfExercise}].#sets[${indexOfDropset}].dropsets[${indexOfDropset}] = :dropset`,
        ExpressionAttributeValues: {
            ":dropset": dropset
        },
        ExpressionAttributeNames: {
            "#sets": "sets"
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    callback(undefined, updatedActiveWorkout.Attributes as IActiveWorkout)
}
