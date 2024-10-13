import { CustomSMSSenderTriggerHandler } from "aws-lambda";
import AWS from 'aws-sdk';
import { randomUUID } from "crypto";
import { buildClient, KmsKeyringNode, CommitmentPolicy } from '@aws-crypto/client-node';
import b64 from 'base64-js';


const sendSMS = async (phoneNumber: string, message: string) => {
    const res = await fetch(process.env.GRAPHQL_ENDPOINT!, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY!
        },
        body: JSON.stringify({
            query: `
        mutation {
            createSMSQueue(
                input: {
                    id: "${randomUUID()}",
                    body: "${message}",
                    des: ["${phoneNumber}"],
                    created_at: "${new Date().toISOString()}"
                }
            ) {
                id
                body
                des
                created_at
                }
        }
        `
        })
    })

    const jso = await res.json();
    return jso as any;
}

export const handler: CustomSMSSenderTriggerHandler = async (event, context, callback) => {

    if (event.triggerSource === "CustomSMSSender_Authentication") {

        const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
        const generatorKeyId = process.env.KEY_ALIAS;
        const keyIds = [process.env.KEY_ARN || ""];
        const keyring = new KmsKeyringNode({ generatorKeyId, keyIds })

        let plainTextCode;
        if (event.request.code) {
            const { plaintext, messageHeader } = await decrypt(keyring, b64.toByteArray(event.request.code));
            plainTextCode = plaintext.toString();
        }

        try {
            await sendSMS(event.request.userAttributes.phone_number, `Your verification code is ${plainTextCode}`);
        }
        catch (e) {
            console.error("Error: Failed to send SMS", e);
            callback(new Error("Failed to send SMS"));
        }
    }

    if (event.triggerSource === "CustomSMSSender_AdminCreateUser") {
        const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
        const generatorKeyId = process.env.KEY_ALIAS;
        const keyIds = [process.env.KEY_ARN || ""];
        const keyring = new KmsKeyringNode({ generatorKeyId, keyIds })

        let plainTextCode;
        if (event.request.code) {
            const { plaintext, messageHeader } = await decrypt(keyring, b64.toByteArray(event.request.code));
            plainTextCode = plaintext.toString();
        }

        try {
            await sendSMS(event.request.userAttributes.phone_number, `Hello, You Invited to gymcore!`);
        }
        catch (e) {
            console.error("Error: Failed to send SMS", e);
            callback(new Error("Failed to send SMS"));
        }
    }

    return event;

}