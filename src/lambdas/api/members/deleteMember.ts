import { Member, MutationDeleteMemberArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const deleteMember: AppSyncResolver<MutationDeleteMemberArgs, Member> = async (event, context, callback) => {

    try {
        const { Attributes: MemberData } = await dynamodb.delete({
            Key: {
                id: event.arguments.id,
                tenantId: process.env.TENANT_ID
            },
            ReturnValues: "ALL_OLD",
            TableName: "MemberTable",
            ConditionExpression: "clubId = :clubId AND #tenantId = :tenantId",
            ExpressionAttributeValues: {
                ":clubId": event.identity?.claims?.['custom:clubId'],
                ":tenantId": process.env.TENANT_ID
            },
            ExpressionAttributeNames: {
                "#clubId": "clubId",
                "#tenantId": "tenantId"
            },
        }).promise()

        await cognito.adminDeleteUser({
            UserPoolId: process.env.USER_POOL_ID!,
            Username: MemberData?.id
        }).promise()

        callback(null, MemberData as Member)
    }
    catch (err: any) {
        callback(err)
    }

}