import { BatchGetItemInput } from "aws-sdk/clients/dynamodb";
import { DynamoDBBatchGetItem, DynamoDBQuery } from "../dynamodb-types";
import { dynamodb } from "../connection";

type Result = DynamoDBQuery;
type PayloadFn = (clubId: string) => Promise<Result>;

export const getClubTrainerIndexesPayload: PayloadFn = async (clubId) => {

    const indexResult: DynamoDBQuery = {
        type: "query",
        TableName: "TrainerIndexTable",
        IndexName: 'trainers-by-club-id',
        KeyConditionExpression: '#tenantId = :tenantId and #clubId = :clubId',
        ExpressionAttributeValues: {
            ':tenantId': process.env.TENANT_ID,
            ':clubId': clubId
        },
        ExpressionAttributeNames: {
            '#tenantId': 'tenantId',
            '#clubId': 'clubId',
        },
        Select: "SPECIFIC_ATTRIBUTES",
        ProjectionExpression: 'id'
    }

    return indexResult;

}