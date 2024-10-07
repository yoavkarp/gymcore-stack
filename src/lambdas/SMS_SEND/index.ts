import { CustomSMSSenderTriggerHandler } from "aws-lambda";
import AWS from 'aws-sdk';
import { randomUUID } from "crypto";
import { buildClient, KmsKeyringNode, CommitmentPolicy } from '@aws-crypto/client-node';
import b64 from 'base64-js';


export const handler: CustomSMSSenderTriggerHandler = async (event, context, callback) => {

    const { encrypt, decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
    const generatorKeyId = process.env.KEY_ALIAS;
    const keyIds = [process.env.KEY_ARN || ""];
    const keyring = new KmsKeyringNode({ generatorKeyId, keyIds })

    let plainTextCode;
    if (event.request.code) {
        const { plaintext, messageHeader } = await decrypt(keyring, b64.toByteArray(event.request.code));
        plainTextCode = plaintext.toString();
    }

    console.log("data", {
        plainTextCode,
        code: event.request.code,
        GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
        API_KEY: process.env.API_KEY
    });


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
                        body: "Code for verification: ${plainTextCode}",
                        des: ["${event.request.userAttributes.phone_number}"],
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

    console.log("RESPONSE", jso);

    console.log("<CODE>", event.request.code);

}