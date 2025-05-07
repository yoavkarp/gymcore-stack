import { Handler, CustomSMSSenderAuthenticationUserTriggerEvent } from "aws-lambda";
import { buildClient, KmsKeyringNode, CommitmentPolicy } from '@aws-crypto/client-node';
import b64 from 'base64-js';
import { sendSMS } from "../send-sms";
import { sendEmail } from "../send-email";

export const handler: Handler<CustomSMSSenderAuthenticationUserTriggerEvent> = async (event, context, callback) => {
    const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
    const generatorKeyId = process.env.KEY_ALIAS;
    const keyIds = [process.env.KEY_ARN || ""];
    const keyring = new KmsKeyringNode({ generatorKeyId, keyIds })

    let plainTextCode;
    if (event.request.code) {
        const { plaintext } = await decrypt(keyring, b64.toByteArray(event.request.code));
        plainTextCode = plaintext.toString();
    }

    try {
        console.log("Sending email to", event.request.userAttributes);
        await sendEmail(event.request.userAttributes.email, `Your verification code is ${plainTextCode}`);
    }
    catch (e) {
        console.error("Error: Failed to send email", e);
    }

    try {
        await sendSMS(event.request.userAttributes.phone_number, `Your verification code is ${plainTextCode}`);
        callback(null, event);
    }
    catch (e) {
        console.error("Error: Failed to send SMS", e);
        callback(new Error("Failed to send SMS"));
    }
}