import { IMutation, IMutationCreateWorkoutArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateWorkoutArgs, IMutation['createWorkout']> = async (event, context, callback) => {

    const {
        input
    } = event.arguments;

    const clubId = event.identity?.sub!;

    // define username
    const { Attributes } = await dynamodb.put({
        TableName: "WorkoutTable",
        Item: {
            id: randomUUID(),
            ...input,
            clubId,
            tenantId: process.env.TENANT_ID,
        }
    }).promise()

    return callback(undefined, Attributes as IWorkout);

}