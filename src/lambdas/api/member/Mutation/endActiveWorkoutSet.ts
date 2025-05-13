import { IMutation, IActiveWorkout, IMutationEndActiveWorkoutSetArgs, IActiveExercise, IActiveCardioExercise, IActiveCardioExerciseInterval, IActiveStrengthExerciseSet } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationEndActiveWorkoutSetArgs, IMutation['endActiveWorkoutSet']> = async (event, context, callback) => {

    const { input: { exerciseId, setId, ...input } } = event.arguments;

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

    const set = existItem?.exercises[indexOfExercise].sets[indexOfSet];
    set.end_at = new Date().toISOString();

    Object.keys(input).forEach(key => {
        set[key].done = input[key as keyof typeof input]
        set[key].end_at = new Date().toISOString();
    })

    const updatedActiveWorkout = await dynamodb.update({
        TableName: "ActiveWorkoutTable",
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: existItem.id
        },
        UpdateExpression: `SET exercises[${indexOfExercise}].#sets[${indexOfSet}] = :set`,
        ExpressionAttributeValues: {
            ":set": set
        },
        ExpressionAttributeNames: {
            "#sets": "sets"
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    callback(undefined, updatedActiveWorkout.Attributes as IActiveWorkout)
}
