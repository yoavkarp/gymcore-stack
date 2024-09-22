import { IMember, IQuery, IQueryGetMemberByIdArgs, IQuerySearchMembersArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { searchMembers } from "../../actions/searchMembers";
import { getMemberByIdPayload } from "../../actions/getMemberById";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IQueryGetMemberByIdArgs, IQuery['getMemberById']> = async (event, context, callback) => {

    const {
        memberId
    } = event.arguments;

    const payload = await getMemberByIdPayload(memberId);

    const { Item } = await dynamodb.get(payload).promise();

    return callback(undefined, Item as IMember);

}