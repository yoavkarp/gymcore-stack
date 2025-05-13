import { IMutation, IMutationCreateTrainerArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";
import { createUser } from "../../actions/createUserPayload";
import { createTrainerPayload } from "../../actions/createTrainerPayload";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateTrainerArgs, IMutation['createTrainer']> = async (event, context, callback) => {

    const {
        input
    } = event.arguments;

    const clubId = event.identity?.sub!;
    const userPoolId = event.identity?.issuer?.split("/").pop()!;

    // define username
    const user = await createUser({ phone_number: input.phone_number, email: input.email || undefined }, "trainer", userPoolId);
    const [trainer, trainerIndex] = await createTrainerPayload(event.identity?.claims?.["custom:tenantId"]!, user?.Attributes?.find((attribute) => attribute.Name === "sub")?.Value!, clubId, input);

    await dynamodb.transactWrite({
        TransactItems: [
            {
                Put: {
                    TableName: trainer.TableName,
                    Item: trainer.Item,
                    ConditionExpression: "attribute_not_exists(id)"
                }
            },
            {
                Put: {
                    TableName: trainerIndex.TableName,
                    Item: trainerIndex.Item,
                }
            }
        ]
    }).promise()

    return callback(undefined, trainer.Item);

}