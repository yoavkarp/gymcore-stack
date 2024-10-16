import { CustomSMSSenderTriggerHandler } from "aws-lambda";
import fs from "fs";
import path from "path";

export const handler: CustomSMSSenderTriggerHandler = async (event, context, callback) => {
    const executeFnFilePath = path.join(__dirname, "triggers", event.triggerSource + ".js");
    if (fs.existsSync(executeFnFilePath)) {
        const fn = require(executeFnFilePath).handler;
        return fn(event, context, callback);
    }
    else {
        return event;
    }
}