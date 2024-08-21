import { AppSyncResolver } from "../../appsync.types";
import { deleteMember } from "./deleteMember";
import { getCurrentMember } from "./getCurrentMember";
import { getMemberById } from "./getMemberById";
import { inviteMember } from "./inviteMember";
import { searchMembers } from "./searchMembers";

const fnMap: Record<string, AppSyncResolver | undefined> = {
    deleteMember,
    getCurrentMember,
    getMemberById,
    inviteMember,
    searchMembers
}

const members: AppSyncResolver = async (event, context, callback) => {

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

export default members;