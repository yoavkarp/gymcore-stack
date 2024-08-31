import { IMutation, IQuery } from "@/appsync/schema.types";
import { AppSyncResolver } from "../appsync.types";

type FnMap = {
    Query?: Record<keyof Omit<IQuery, "__typename">, string>
    Mutation?: Record<keyof Omit<IMutation, "__typename">, string>
}

const fnMap: FnMap = {
    Mutation: {
        createMember: "./members/createMember",
        deleteMember: "./members/deleteMember",
        updateAuthenticatedMember: "./members/updateAuthenticatedMember",
        createMeasurement: "./members/createMeasurement",
    },
    Query: {
        getMemberById: "./members/getMemberById",
        getAuthenticatedMember: "./members/getAuthenticatedMember",
        getAuthenticatedClub: "./clubs/getAuthenticatedClub",
        getClubById: "./clubs/getClubById",
        getTenant: "./tenant/getTenant"
    }
}

export const main: AppSyncResolver = async (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;
    const parentType = event.info.parentTypeName as keyof FnMap;
    const fnPath = fnMap[parentType]?.[event.info.fieldName as keyof FnMap[keyof FnMap]];


    if (!fnPath) {
        return callback(new Error(`No function found for ${event.info.parentTypeName}.${event.info.fieldName}`))
    }
    try {
        const { handler }: { handler: AppSyncResolver } = await import(fnPath);
        return handler(event, context, callback);
    }

    catch (err: any) {
        return callback(err)
    }
};