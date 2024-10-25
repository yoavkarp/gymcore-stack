import { IMutation, IMutationStartActiveWorkoutArgs, IActiveWorkout, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { addCreateMetadata } from "../../actions/addMetadata";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationStartActiveWorkoutArgs, IMutation['startActiveWorkout']> = async (event, context, callback) => {
    const { workoutId } = event.arguments;

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

    if (activeWorkout.Items?.length) {
        return callback(new Error("Member already has an active workout"))
    }

    const { Item: workout } = await dynamodb.get({
        TableName: "WorkoutTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: workoutId,
        }
    }).promise()

    if (!workout) {
        return callback(new Error("Workout not found"))
    }

    const Item = addCreateMetadata({
        id: randomUUID(),
        workoutId: workout.id,
        exercises: workout.exercises.map((ex: any) => {
            return {
                ...ex,
                __typename: "Active" + ex.__typename
            }
        }),
        clubId: workout.clubId,
        'tenantId#memberId': `${process.env.TENANT_ID}#${event.identity?.sub}`,
        'tenantId#planId': workout["tenantId#planId"],
        started_at: new Date().toISOString(),
        planId: workout.planId,
        memberId: event.identity?.sub!,
        name: workout.name
    }, event.identity?.sub!) satisfies IActiveWorkout

    await dynamodb.put({
        TableName: "ActiveWorkoutTable",
        Item,
        ConditionExpression: "attribute_not_exists(id)",
    }).promise()

    callback(undefined, Item)
}
