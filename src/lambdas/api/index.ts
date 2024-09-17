import { IMutation, IQuery } from "@/appsync/schema";
import { AppSyncResolver } from "../appsync.types";
import AWS from "aws-sdk";

AWS.config.update({ region: 'eu-central-1' });

const buildPath = (group: "member" | "club", parentType: string, fieldName: string) => {
    return `./${group}/${parentType}/${fieldName}`;
}

export const main: AppSyncResolver = async (event, context, callback) => {
    const fnPath = buildPath(event.identity!.claims!["cognito:groups"]![0]!, event.info.parentTypeName, event.info.fieldName)

    try {
        const func = require(fnPath);
        await func.handler(event, context, callback);
    }
    catch (err: any) {
        return callback(err)
    }
};