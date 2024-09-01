import { IMutationCreateMemberArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateMemberArgs> = async (event, context, callback) => {

    const {
        input: {
            phone_number
        }
    } = event.arguments;

    // define username
    const Username = phone_number;

    const { User: user } = await cognito.adminCreateUser({
        UserPoolId: process.env.USER_POOL_ID,
        Username: phone_number.substring(4),
        TemporaryPassword: "Abcd1234!@",
        UserAttributes: [
            {
                Name: 'phone_number',
                Value: phone_number
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
        GroupName: "member"
    }).promise()

    const memberItem = {
        id: user?.Attributes?.find(attr => attr.Name === "sub")?.Value,
        tenantId: process.env.TENANT_ID,
        phone_number,
        created_at: user?.UserCreateDate?.toISOString(),
        updated_at: user?.UserCreateDate?.toISOString()
    }

    await dynamodb.put({
        TableName: "MemberTable",
        Item: memberItem,
        ConditionExpression: "attribute_not_exists(id)"
    }).promise()

    return callback(undefined, memberItem)

}