import { IMutation, IMutationStartActiveWorkoutArgs, IActiveWorkout, IWorkout, IMutationEndActiveWorkoutIntervalArgs, IActiveExercise, IActiveCardioExercise, IActiveCardioExerciseInterval } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { addCreateMetadata } from "../../actions/addMetadata";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationEndActiveWorkoutIntervalArgs, IMutation['endActiveWorkoutInterval']> = async (event, context, callback) => {

    const { input: { exerciseId, intervalId, ...input } } = event.arguments;

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
    const indexOfInterval = existItem?.exercises[indexOfExercise].intervals.findIndex((interval: IActiveCardioExerciseInterval) => interval.id === intervalId)

    const interval = existItem?.exercises[indexOfExercise].intervals[indexOfInterval];
    interval.end_at = new Date().toISOString();

    Object.keys(input).forEach(key => {
        interval[key].done = input[key as keyof typeof input]
        interval[key].end_at = new Date().toISOString()
    })

    const updatedActiveWorkout = await dynamodb.update({
        TableName: "ActiveWorkoutTable",
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: existItem.id
        },
        UpdateExpression: `SET exercises[${indexOfExercise}].intervals[${indexOfInterval}] = :interval`,
        ExpressionAttributeValues: {
            ":interval": interval
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    callback(undefined, updatedActiveWorkout.Attributes as IActiveWorkout)
}
