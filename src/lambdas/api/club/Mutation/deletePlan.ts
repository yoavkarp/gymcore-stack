import { IMutation, IMutationDeletePlanArgs, IPlan } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationDeletePlanArgs, IMutation['createPlan']> = async (event, context, callback) => {

    const {
        planId
    } = event.arguments;

    const { Attributes: document } = await dynamodb.delete({
        TableName: 'PlanTable',
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: planId
        },
        ReturnValues: "ALL_OLD"
    }).promise()

    if (!document) {
        return callback(new Error('Plan not found'))
    }

    return callback(undefined, document as IPlan);

}