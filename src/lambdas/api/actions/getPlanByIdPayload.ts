import { DynamoDBGetItem } from "../dynamodb-types";

type Result = DynamoDBGetItem;

export const getPlanByIdPayload: (tenantId: string, id: string) => Promise<Result> = async (tenantId, id) => {

    const result: Result = {
        type: "get",
        TableName: "PlanTable",
        Key: {
            tenantId,
            id: id
        }
    }

    return result;

}