import { DynamoDBGetItem } from "../dynamodb-types";

type Result = DynamoDBGetItem;

export const getPlanByIdPayload: (id: string) => Promise<Result> = async (id) => {

    const result: Result = {
        type: "get",
        TableName: "PlanTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: id
        }
    }

    return result;

}