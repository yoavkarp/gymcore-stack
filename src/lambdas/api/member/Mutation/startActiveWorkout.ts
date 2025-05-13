import { IMutation, IMutationStartActiveWorkoutArgs, IActiveWorkout, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { addCreateMetadata } from "../../actions/addMetadata";
import { randomUUID } from "crypto";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({ region: process.env.AWS_REGION });

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
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId,
        }
    }).promise()

    if (!workout) {
        return callback(new Error("Workout not found"))
    }

    const createUrls = await Promise.all(workout.exercises.map((ex: any) => {
        return dynamodb.get({
            TableName: "ExercisesCollection",
            Key: {
                id: ex.xid
            }
        }).promise().then(({ Item }) => {
            if (!Item) {
                return ""
            }

            return s3.getSignedUrlPromise('getObject', {
                Bucket: 'gymcore-exercises',
                Key: Item.video_object,
                Expires: 60 * 60 * 2, // 2 hours
            })

        })

    }))

    const withVideos = (workout.exercises as any[]).map((ex: any, i) => {
        return {
            ...ex,
            video_url: createUrls[i],
            __typename: "Active" + ex.__typename,
        }
    })

    const Item = addCreateMetadata(
        event.identity?.claims?.['custom:tenantId'] || "",
        {
            id: randomUUID(),
            workoutId: workout.id,
            exercises: withVideos,
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
