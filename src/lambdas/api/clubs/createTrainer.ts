import { IMutation, IMutationCreateTrainerArgs, ITrainer } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateTrainerArgs, IMutation['createTrainer']> = async (event, context, callback) => {

    const { input } = event.arguments;

    // define username
    const Username = input.phone_number;

    const { User: user } = await cognito.adminCreateUser({
        UserPoolId: process.env.USER_POOL_ID,
        Username: input.phone_number.substring(4),
        TemporaryPassword: "Abcd1234!@",
        UserAttributes: [
            {
                Name: 'phone_number',
                Value: input.phone_number
            },
            {
                Name: "phone_number_verified",
                Value: "true"
            }
        ]
    }).promise()

    await cognito.adminAddUserToGroup({
        Username,
        UserPoolId: process.env.USER_POOL_ID,
        GroupName: "trainer"
    }).promise()

    const trainerItem = {
        id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
        ...input,
        clubId: event.identity!.sub,
        tenantId: process.env.TENANT_ID,
        created_at: user!.UserCreateDate!.toISOString(),
        updated_at: user!.UserCreateDate!.toISOString()
    }

    await dynamodb.put({
        TableName: "TrainerTable",
        Item: trainerItem,
        ConditionExpression: "attribute_not_exists(id)"
    }).promise()

    await dynamodb.put({
        TableName: "TrainerClubTable",
        Item: {
            id: trainerItem.id,
            clubId: event.identity!.sub,
            tenantId: process.env.TENANT_ID,
            created_at: user!.UserCreateDate!.toISOString(),
            updated_at: user!.UserCreateDate!.toISOString()
        },
        ConditionExpression: "attribute_not_exists(id)"
    }).promise()

    return callback(undefined, trainerItem as ITrainer)

}