import { randomUUID } from "crypto";

export const sendSMS = async (phoneNumber: string, message: string) => {
    console.log("SENDING SMS", phoneNumber, process.env.GRAPHQL_ENDPOINT, process.env.API_KEY);

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

    console.log("JSO", jso);
    return jso as any;
}
