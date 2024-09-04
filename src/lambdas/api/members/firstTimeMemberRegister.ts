import { IMember, IMutation, IMutationFirstTimeMemberRegisterArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { cognito, dynamodb } from "../connection";

export const handler: AppSyncResolver<IMutationFirstTimeMemberRegisterArgs, IMutation['firstTimeMemberRegister']> = async (event, context, callback) => {

    const { input } = event.arguments;
    Object.assign(input, { registered: true });

    const Username = event.identity?.claims?.phone_number;

    try {

        const { Attributes } = await dynamodb.update({
            TableName: "MemberTable",
            Key: {
                id: event.identity?.sub,
                tenantId: process.env.TENANT_ID
            },
            UpdateExpression: Object.keys(input).reduce((acc, key) => {
                return acc + `#${key} = :${key},`
            }, "SET ").slice(0, -1),
            ExpressionAttributeNames: Object.keys(input).reduce((acc, key) => {
                return { ...acc, [`#${key}`]: key }
            }, {}),
            ExpressionAttributeValues: Object.keys(input).reduce((acc, key) => {
                return { ...acc, [`:${key}`]: input[key as keyof typeof input] }
            }, {}),
            ReturnValues: "ALL_NEW",
            ConditionExpression: "attribute_not_exists(registered)"
        }).promise()

        if (!Attributes) {
            return callback(new Error(`Member with id ${event.identity?.sub} not found`));
        }

        if (input.email) {
            await cognito.adminUpdateUserAttributes({
                UserPoolId: process.env.USER_POOL_ID,
                Username,
                UserAttributes: [
                    {
                        Name: "email",
                        Value: input.email
                    },
                    {
                        Name: "email_verified",
                        Value: "true"
                    }
                ]
            }).promise()
        }

        return callback(undefined, Attributes as IMember)
    }
    catch (err: any) {
        return callback(err)
    }
}