import { IMutation, IMutationCreateMemberArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";
import { createUser } from "../../actions/createUserPayload";
import { createMemberPayload } from "../../actions/createMemberPayload";

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'eu-central-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: AppSyncResolver<IMutationCreateMemberArgs, IMutation['createMember']> = async (event, context, callback) => {

    const {
        input
    } = event.arguments;

    const userPoolId = event.identity?.issuer?.split("/").pop()!;

    // define username
    const user = await createUser({ phone_number: input.phone_number, email: input.email || undefined }, "member", userPoolId);
    const member = await createMemberPayload(event.identity?.claims?.["custom:tenantId"]!, user?.Attributes?.find((attribute) => attribute.Name === "sub")?.Value!, input);

    if (Array.isArray(member)) {
        await dynamodb.transactWrite({
            TransactItems: member.map((item) => ({
                Put: {
                    TableName: item.TableName,
                    Item: item,
                    ConditionExpression: "attribute_not_exists(id)"
                }
            }))
        }).promise()
    } else {
        await dynamodb.put({
            TableName: member.TableName,
            Item: member.Item,
            ConditionExpression: "attribute_not_exists(id)"
        }).promise()
    }

    return callback(undefined, Array.isArray(member) ? member[0].Item : member.Item);

}