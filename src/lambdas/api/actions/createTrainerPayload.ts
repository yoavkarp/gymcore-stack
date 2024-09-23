import { ICreateTrainerInput, IMeasurement, ITrainer } from "@/appsync/schema";
import { dynamodb } from "../connection";
import { z } from 'zod';
import { DynamoDBPut } from "../dynamodb-types";
import { createMeasurementPayload } from "./createMeasurementPayload";
import { TrainerIndex } from "../trainer-index";

type Input = ICreateTrainerInput

const schema = z.object({
    address: z.string().optional(),
    birthdate: z.string().date(),
    email: z.string().email().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    name: z.string().min(2).max(50),
    phone_number: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number")
})

type Result = [DynamoDBPut<ITrainer>, DynamoDBPut<TrainerIndex>];
type PayloadFn = (id: string, clubId: string, input: Input) => Promise<Result>;

export const createTrainerPayload: PayloadFn = async (id, clubId, input) => {

    const validate = schema.safeParse(input)
    if (!validate.success) {
        throw new Error(validate.error.errors.at(0)?.message)
    }

    const Item = {
        ...input,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id,
        tenantId: process.env.TENANT_ID,
    } satisfies ITrainer

    const result: Result = [
        {
            TableName: "TrainerTable",
            Item: Item,
            type: "put"
        },
        {
            TableName: "TrainerIndexTable",
            Item: {
                tenantId: process.env.TENANT_ID,
                clubId,
                id,
                'trainerId_clubId': `${id}_${clubId}`,
            },
            type: "put",
            ConditionExpression: "attribute_not_exists(trainerId_clubId)"
        }
    ]

    return result;

}