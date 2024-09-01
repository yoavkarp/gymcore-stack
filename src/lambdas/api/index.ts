import { IMutation, IQuery } from "@/appsync/schema.types";
import { AppSyncResolver } from "../appsync.types";
import AWS from "aws-sdk";
AWS.config.update({ region: 'eu-central-1' });

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
    const parentType = event.info.parentTypeName as keyof FnMap;
    const fnPath = fnMap[parentType]?.[event.info.fieldName as keyof FnMap[keyof FnMap]];

    console.log(parentType, event.info.fieldName, fnPath)

    if (!fnPath) {
        return callback(new Error(`No function found for ${event.info.parentTypeName}.${event.info.fieldName}`))
    }

    try {
        const func = require(fnPath);
        await func.handler(event, context, callback);
    }
    catch (err: any) {
        return callback(err)
    }
};