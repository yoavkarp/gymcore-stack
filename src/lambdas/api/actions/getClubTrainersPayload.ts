import { BatchGetItemInput } from "aws-sdk/clients/dynamodb";
import { DynamoDBBatchGetItem, DynamoDBQuery } from "../dynamodb-types";

type Result = DynamoDBBatchGetItem;
type PayloadFn = (tenantId: string, ids: string[]) => Promise<Result>;

export const getClubTrainersPayload: PayloadFn = async (tenantId, ids) => {

    const result: DynamoDBBatchGetItem = {
        type: "batchGet",
        RequestItems: {
            TrainerTable: {
                Keys: ids.map((id) => ({
                    tenantId,
                    id
                }))
            }
        }
    }

    return result;

}