import { IPlan, IQuery, IQueryGetPlanByIdArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { getPlanByIdPayload } from "../../actions/getPlanByIdPayload";

export const handler: AppSyncResolver<IQueryGetPlanByIdArgs, IQuery['getPlanById']> = async (event, context, callback) => {

    const {
        planId
    } = event.arguments;

    const payload = await getPlanByIdPayload(event.identity?.claims?.["custom:tenantId"]!, planId);

    const { Item } = await dynamodb.get(payload).promise();

    return callback(undefined, Item as IPlan);

}