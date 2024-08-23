import { AppSyncResolver } from "../appsync.types";
import membersFns from "./members";

const fnMap: Record<string, AppSyncResolver | undefined> = {
    ...membersFns
}

export const main: AppSyncResolver = async (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;
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