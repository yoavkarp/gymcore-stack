import { BatchGetItemInput } from "aws-sdk/clients/dynamodb";
import { DynamoDBBatchGetItem, DynamoDBQuery } from "../dynamodb-types";

type Result = DynamoDBBatchGetItem;
type PayloadFn = (ids: string[]) => Promise<Result>;

export const getClubTrainersPayload: PayloadFn = async (ids) => {

    const result: DynamoDBBatchGetItem = {
        type: "batchGet",
        RequestItems: {
            TrainerTable: {
                Keys: ids.map((id) => ({
                    tenantId: process.env.TENANT_ID,
                    id
                }))
            }
        }
    }

    return result;

}