import { IMember, IMutation, IMutationDeleteMemberArgs } from "@/appsync/schema";
import { AppSyncResolver } from "../../appsync.types";
import { cognito, dynamodb } from "../connection";

export const handler: AppSyncResolver<IMutationDeleteMemberArgs, IMutation['deleteMember']> = async (event, context, callback) => {
    try {
        const { Attributes: data } = await dynamodb.delete({
            Key: {
                id: event.arguments.memberId,
                tenantId: process.env.TENANT_ID
            },
            ReturnValues: "ALL_OLD",
            TableName: "MemberTable",
        }).promise()

        await cognito.adminRemoveUserFromGroup({
            UserPoolId: process.env.USER_POOL_ID,
            Username: data?.phoneNumber,
            GroupName: "member"
        }).promise()

        callback(null, data as IMember)
    }
    catch (err: any) {
        callback(err)
    }

}