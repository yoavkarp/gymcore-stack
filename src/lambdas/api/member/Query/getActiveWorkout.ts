import { IMutation, IMutationStartActiveWorkoutArgs, IActiveWorkout, IActiveStrengthExerciseSet, IMutationEndActiveWorkoutDropsetArgs, IActiveExercise, IActiveCardioExercise, IActiveCardioExerciseInterval, IActiveStrengthExerciseDropSet, IQuery } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { addCreateMetadata } from "../../actions/addMetadata";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<undefined, IQuery['getActiveWorkout']> = async (event, context, callback) => {

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

    callback(undefined, activeWorkout.Items?.[0] as any)
}
