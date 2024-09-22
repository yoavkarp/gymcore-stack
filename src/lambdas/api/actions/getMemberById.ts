import { ICreateTrainerInput, IMeasurement, IMember, ITrainer } from "@/appsync/schema";
import { dynamodb } from "../connection";
import { z } from 'zod';
import { DynamoDBGet, DynamoDBPut } from "../dynamodb-types";
import { createMeasurementPayload } from "./createMeasurement";

type Result = DynamoDBGet<IMember>;

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