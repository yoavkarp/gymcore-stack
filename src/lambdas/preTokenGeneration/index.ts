import { PreTokenGenerationNewPasswordChallengeTriggerEvent, PreTokenGenerationTriggerHandler } from "aws-lambda";
import { cognito, dynamodb } from "./connection";

export const handler: PreTokenGenerationTriggerHandler = async (event) => {

    const { Groups } = await cognito.adminListGroupsForUser({
        UserPoolId: event.userPoolId,
        Username: event.userName
    }).promise();

    if (!Groups || !Groups.length || Groups.filter(group => ["member", "club"].includes(group.GroupName || "")).length === 0) {
        throw new Error('User not found');
    }

    const group = Groups.filter(group => ["member", "club"].includes(group.GroupName || ""))[0].GroupName;

    if (!group) {
        throw new Error('Group not found');
    }

    if (event.triggerSource === "TokenGeneration_NewPasswordChallenge") {

        const { Attributes } = await dynamodb.update({
            Key: {
                tenantId: process.env.TENANT_ID,
                id: event.request.userAttributes.sub
            },
            TableName: group === 'member' ? "MemberTable" : group === 'club' ? "ClubTable" : "",
            UpdateExpression: Object.keys(event.request.userAttributes).reduce((acc, key) => {
                return acc + `#${key} = :${key},`
            }, "set ").slice(0, -1),
            ExpressionAttributeValues: Object.keys(event.request.userAttributes).reduce<any>((acc, key) => {
                acc[`:${key}`] = event.request.userAttributes[key];
                return acc;
            }, {}),
            ExpressionAttributeNames: Object.keys(event.request.userAttributes).reduce<any>((acc, key) => {
                acc[`#${key}`] = key;
                return acc;
            }, {}),
            ReturnValues: "UPDATED_NEW"
        }).promise()

        if (!Attributes) {
            return event;
        }

        event.response.claimsOverrideDetails = {
            claimsToAddOrOverride: {
                'role': group,
                ...Object.keys(Attributes).reduce<{ [x: `member:${string}`]: string }>((acc, key) => {
                    acc[`member:${key}`] = Attributes[key];
                    return acc;
                }, {})
            }
        }

        return event;
    }

    if (Groups.find(group => group.GroupName === "club")) {
        const { Item } = await dynamodb.get({
            TableName: "ClubTable",
            Key: {
                tenantId: process.env.TENANT_ID,
                id: event.request.userAttributes.sub
            }
        }).promise();

        if (!Item) {
            throw new Error('Club not found');
        }

        event.response.claimsOverrideDetails = {
            claimsToAddOrOverride: {
                'role': 'club',
                ...Object.keys(Item).reduce<{ [x: `club:${string}`]: string }>((acc, key) => {
                    acc[`club:${key}`] = Item[key];
                    return acc;
                }, {})
            }
        }
    }
    else if (Groups.find(group => group.GroupName === "member")) {

        const { Item } = await dynamodb.get({
            TableName: "MemberTable",
            Key: {
                tenantId: process.env.TENANT_ID,
                id: event.request.userAttributes.sub
            }
        }).promise();

        if (!Item) {
            throw new Error('Club not found');
        }

        event.response.claimsOverrideDetails = {
            claimsToAddOrOverride: {
                'role': 'member',
                ...Object.keys(Item).reduce<{ [x: `member:${string}`]: string }>((acc, key) => {
                    acc[`member:${key}`] = Item[key];
                    return acc;
                }, {})
            }
        }
    }
    return event;
}