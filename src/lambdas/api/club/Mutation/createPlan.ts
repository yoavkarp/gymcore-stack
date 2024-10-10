import { IMutation, IMutationCreatePlanArgs, IPlan } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationCreatePlanArgs, IMutation['createPlan']> = async (event, context, callback) => {

    const {
        trainerId,
        input
    } = event.arguments;

    const clubId = event.identity?.sub!;

    const Item = addCreateMetadata({
        id: randomUUID(),
        clubId,
        ...input,
        trainerId,
        "tenantId#clubId": `${process.env.TENANT_ID}#${clubId}`,
        "tenantId#trainerId": `${process.env.TENANT_ID}#${trainerId}`,
        "tenantId#memberId": `${process.env.TENANT_ID}#${input.memberId}`
    }, clubId) satisfies IPlan

    // define username
    const { Attributes } = await dynamodb.put({
        TableName: "PlanTable",
        Item
    }).promise()

    return callback(undefined, Item);

}