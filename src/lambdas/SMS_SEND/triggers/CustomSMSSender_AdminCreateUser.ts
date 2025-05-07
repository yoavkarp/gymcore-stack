import { Handler, CustomSMSSenderAdminCreateUserTriggerEvent } from "aws-lambda";
import { sendSMS } from "../send-sms";
import { sendEmail } from "../send-email";

export const handler: Handler<CustomSMSSenderAdminCreateUserTriggerEvent> = async (event, context, callback) => {
    try {
        if (event.request.userAttributes.email)
            await sendEmail(event.request.userAttributes.email, `Hello, You Invited to gymcore!`);
    }
    catch (e) {
        console.error("Error: Failed to send email", e);
    }

    try {
        await sendSMS(event.request.userAttributes.phone_number, `Hello, You Invited to gymcore!`);
    }
    catch (e) {
        console.error("Error: Failed to send SMS", e);
        callback(new Error("Failed to send SMS"));
    }
}