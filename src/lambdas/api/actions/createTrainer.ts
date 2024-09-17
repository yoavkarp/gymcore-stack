import { ICreateTrainerInput, IMeasurement, ITrainer } from "@/appsync/schema";
import { dynamodb } from "../connection";
import { z } from 'zod';
import { DynamoDBPut } from "../dynamodb-types";
import { createMeasurementPayload } from "./createMeasurement";

type Input = ICreateTrainerInput

const schema = z.object({
    address: z.string().optional(),
    birthdate: z.string().date(),
    email: z.string().email().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    name: z.string().min(2).max(50),
    phone_number: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number")
})

type Result = DynamoDBPut<ITrainer>;

export const createTrainerPayload: (id: string, input: Input) => Promise<Result> = async (id, input) => {

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

    const result: Result = {
        TableName: "TrainerTable",
        Item: Item,
        type: "put"
    }

    return result;

}