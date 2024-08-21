import { AppSyncResolver } from "../appsync.types";
import { deleteMember } from "./members/deleteMember";
import { getCurrentMember } from "./members/getCurrentMember";
import { getMemberById } from "./members/getMemberById";
import { inviteMember } from "./members/inviteMember";
import { searchMembers } from "./members/searchMembers";
import members from './members';

const fnMap: Record<string, AppSyncResolver | undefined> = {
    members
}

export const main: AppSyncResolver = async (event, context, callback) => {

    const fn = fnMap[event.info.fieldName];

    if (!fn) {
        return callback(new Error(`No function found for ${event.info.parentTypeName}.${event.info.fieldName}`))
    }

    try {
        return fn(event, context, callback);
    }

    catch (err: any) {
        return callback(err)
    }
};