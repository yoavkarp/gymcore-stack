import { PreTokenGenerationNewPasswordChallengeTriggerEvent, PreTokenGenerationTriggerHandler } from "aws-lambda";
import { cognito, dynamodb } from "./connection";

const groupTableMap = {
    member: "MemberTable",
    club: "ClubTable"
}

export const handler: PreTokenGenerationTriggerHandler = async (event, context, callback) => {

    const { Groups } = await cognito.adminListGroupsForUser({
        UserPoolId: event.userPoolId,
        Username: event.userName
    }).promise();

    if (!Groups || !Groups.length || Groups.filter(group => ["member", "club"].includes(group.GroupName || "")).length === 0) {
        throw new Error('User not found');
    }

    const group = Groups.filter(group => ["member", "club"].includes(group.GroupName || ""))?.[0]?.GroupName as keyof typeof groupTableMap;

    if (!group) {
        return callback(new Error('Group not found'));
    }

    let attributes: { [key: string]: string } = {};


    if (event.triggerSource === "TokenGeneration_NewPasswordChallenge") {
        const attributeKeys = Object.keys(event.request.userAttributes).filter((key) => ["#", ":"].every((char) => !key.includes(char)));

        const { Attributes } = await dynamodb.update({
            Key: {
                tenantId: process.env.TENANT_ID,
                id: event.request.userAttributes.sub
            },
            TableName: group === 'member' ? "MemberTable" : group === 'club' ? "ClubTable" : "",
            UpdateExpression: attributeKeys.reduce((acc, key) => {
                return acc + `#${key} = :${key},`
            }, "set ").slice(0, -1),
            ExpressionAttributeValues: attributeKeys.reduce<any>((acc, key) => {
                acc[`:${key}`] = event.request.userAttributes[key];
                return acc;
            }, {}),
            ExpressionAttributeNames: attributeKeys.reduce<any>((acc, key) => {
                acc[`#${key}`] = key;
                return acc;
            }, {}),
            ReturnValues: "ALL_NEW"
        }).promise()

        if (!Attributes) {
            return event;
        }

        attributes = Attributes;
    }
    else {
        const { Item } = await dynamodb.get({
            TableName: groupTableMap[group],
            Key: {
                tenantId: process.env.TENANT_ID,
                id: event.request.userAttributes.sub
            }
        }).promise();

        if (!Item) {
            return callback(new Error('not found'));
        }

        attributes = Item;
    }


    event.response.claimsOverrideDetails = {
        claimsToAddOrOverride: {
            'role': group,
            ...Object.keys(attributes).reduce<{ [x: `${typeof group}:${string}`]: string }>((acc, key) => {
                acc[`${group}:${key}`] = attributes[key];
                return acc;
            }, {})
        }
    }

    return event;
}