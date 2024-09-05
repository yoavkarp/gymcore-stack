import { IMeasurement, IMutation, IMutationCreateMeasurementArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { dynamodb } from "../connection";
import { randomUUID } from "crypto";

export const handler: AppSyncResolver<IMutationCreateMeasurementArgs, IMutation['createMeasurement']> = async (event, context, callback) => {

    const { input } = event.arguments;
    const isClub = event.identity?.groups?.includes("club");
    const memberId = isClub ? input.memberId : event.identity?.sub

    const { Item: memberDoc } = await dynamodb.get({
        TableName: "MemberTable",
        Key: {
            id: memberId,
            tenantId: process.env.TENANT_ID
        }
    }).promise()

    if (!memberDoc) {
        return callback(new Error(`Member with id ${input.memberId} not found`));
    }

    const measurementItem = {
        id: randomUUID(),
        "tenantId#memberId": `${process.env.TENANT_ID}#${memberId}`,
        tenantId: process.env.TENANT_ID,
        memberId: memberId,
        clubId: event.identity?.groups?.includes("club") ? event.identity.sub : undefined,
        weight: input.weight,
        height: input.height,
        heart_rate: input.heart_rate,
        fat: input.fat,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }

    await dynamodb.put({
        TableName: "MeasurementTable",
        Item: measurementItem
    }).promise()

    return callback(undefined, measurementItem as IMeasurement)

}