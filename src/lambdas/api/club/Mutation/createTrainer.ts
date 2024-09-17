import { IMutation, IMutationCreateTrainerArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";
import { createUser } from "../../actions/createUser";
import { createTrainerPayload } from "../../actions/createTrainer";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateTrainerArgs, IMutation['createTrainer']> = async (event, context, callback) => {

    const {
        input
    } = event.arguments;

    // define username
    const user = await createUser(input.phone_number, "member");
    const trainer = await createTrainerPayload(user?.Attributes?.find((attribute) => attribute.Name === "sub")?.Value!, input);

    await dynamodb.put({
        TableName: trainer.TableName,
        Item: trainer.Item,
        ConditionExpression: "attribute_not_exists(id)"
    }).promise()

    return callback(undefined, trainer.Item);

}