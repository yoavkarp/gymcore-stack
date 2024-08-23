import { AppSyncResolver } from "../../appsync.types";
import { deleteMember } from "./deleteMember";
import { getCurrentMember } from "./getCurrentMember";
import { getMemberById } from "./getMemberById";
import { createMember } from "./createMember";

const membersFns: Record<string, AppSyncResolver | undefined> = {
    deleteMember,
    getCurrentMember,
    getMemberById,
    createMember,
}

export default membersFns;