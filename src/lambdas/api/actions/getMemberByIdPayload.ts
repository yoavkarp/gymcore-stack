import { ICreateTrainerInput, IMeasurement, IMember, ITrainer } from "@/appsync/schema";
import { dynamodb } from "../connection";
import { z } from 'zod';
import { DynamoDBGetItem, DynamoDBPut } from "../dynamodb-types";
import { createMeasurementPayload } from "./createMeasurementPayload";

type Result = DynamoDBGetItem;

export const getMemberByIdPayload: (id: string) => Promise<Result> = async (id) => {

    const result: Result = {
        type: "get",
        TableName: "MemberTable",
        Key: {
            tenantId: process.env.TENANT_ID,
            id: id
        }
    }

    return result;

}