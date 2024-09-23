import { IQuery, IQuerySearchMembersArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { searchMembers } from "../../actions/searchMembersPayload";

export const handler: AppSyncResolver<IQuerySearchMembersArgs, IQuery['searchMembers']> = async (event, context, callback) => {

    const {
        text
    } = event.arguments;

    const results = await searchMembers(text)

    return callback(undefined, results);

}