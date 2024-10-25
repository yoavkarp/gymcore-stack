import { CustomSMSSenderTriggerHandler } from "aws-lambda";
import fs from "fs";
import path from "path";

const handlers: Record<string, CustomSMSSenderTriggerHandler> = {
    CustomSMSSender_Authentication: require("./triggers/CustomSMSSender_Authentication").handler,
    CustomSMSSender_AdminCreateUser: require("./triggers/CustomSMSSender_AdminCreateUser").handler,
}

export const handler: CustomSMSSenderTriggerHandler = async (event, context, callback) => {
    if (handlers[event.triggerSource]) {
        return handlers[event.triggerSource](event, context, callback);
    }
    else {
        console.log("No trigger found for " + event.triggerSource);
        return event;
    }
}