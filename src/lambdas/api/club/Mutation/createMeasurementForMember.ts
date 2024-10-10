import { IMeasurement, IMutation, IMutationCreateMeasurementForMemberArgs, IMutationCreateMemberArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";
import { createUser } from "../../actions/createUserPayload";
import { createMemberPayload } from "../../actions/createMemberPayload";
import { createMeasurementPayload } from "../../actions/createMeasurementPayload";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateMeasurementForMemberArgs, IMutation['createMeasurementForMember']> = async (event, context, callback) => {

    const {
        memberId,
        input,
    } = event.arguments;

    // define username
    const payload = createMeasurementPayload(memberId, input);

    const { Attributes } = await dynamodb.put(payload).promise();

    return callback(undefined, payload.Item);

}