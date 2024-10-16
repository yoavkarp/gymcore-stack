import { Handler, CustomSMSSenderAdminCreateUserTriggerEvent } from "aws-lambda";
import { sendSMS } from "../send-sms";

export const handler: Handler<CustomSMSSenderAdminCreateUserTriggerEvent> = async (event, context, callback) => {
    try {
        await sendSMS(event.request.userAttributes.phone_number, `Hello, You Invited to gymcore!`);
    }
    catch (e) {
        console.error("Error: Failed to send SMS", e);
        callback(new Error("Failed to send SMS"));
    }
}