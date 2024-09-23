import { dynamodb } from "../connection";
import { IMember } from "@/appsync/schema";

export const searchMembers = async (text: string) => {
    const { Items } = await dynamodb.query({
        TableName: "MemberTable",
        KeyConditionExpression: "#tenantId = :tenantId",
        ExpressionAttributeValues: {
            ":tenantId": process.env.TENANT_ID,
            ":value": text
        },
        ExpressionAttributeNames: {
            "#tenantId": "tenantId",
            "#name": "name",
            "#phone_number": "phone_number",
            "#email": "email"
        },
        FilterExpression: "contains(#name, :value) OR contains(#phone_number, :value) OR contains(#email, :value)",
    }).promise()

    return Items as IMember[];

}