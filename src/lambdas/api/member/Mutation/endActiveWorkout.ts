import { IMutation, IMutationStartActiveWorkoutArgs, IActiveWorkout, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { addCreateMetadata } from "../../actions/addMetadata";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<undefined, IMutation['endActiveWorkout']> = async (event, context, callback) => {

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

    const updatedActiveWorkout = await dynamodb.update({
        TableName: "ActiveWorkoutTable",
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: activeWorkout.Items![0].id,
        },
        UpdateExpression: "SET end_at = :end_at",
        ExpressionAttributeValues: {
            ":end_at": new Date().toISOString()
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    callback(undefined, updatedActiveWorkout.Attributes as IActiveWorkout)
}
