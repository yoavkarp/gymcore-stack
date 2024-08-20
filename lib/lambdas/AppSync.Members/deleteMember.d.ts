import { Member, MutationDeleteMemberArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../appsync.types";
export declare const deleteMember: AppSyncResolver<MutationDeleteMemberArgs, Member>;
