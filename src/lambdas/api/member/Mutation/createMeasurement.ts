import { IMeasurement, IMutation, IMutationCreateMeasurementArgs, IMutationCreateMemberArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";
import { createUser } from "../../actions/createUserPayload";
import { createMemberPayload } from "../../actions/createMemberPayload";
import { createMeasurementPayload } from "../../actions/createMeasurementPayload";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateMeasurementArgs, IMutation['createMeasurement']> = async (event, context, callback) => {

    const {
        input,
    } = event.arguments;

    const memberId = event.identity?.sub!

    // define username
    const payload = createMeasurementPayload(memberId, input);

    const { Attributes } = await dynamodb.put(payload).promise();

    return callback(undefined, payload.Item);

}