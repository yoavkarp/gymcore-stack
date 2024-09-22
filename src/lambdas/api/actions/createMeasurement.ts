import { ICreateMeasurementInput, IMeasurement } from "@/appsync/schema";
import { dynamodb } from "../connection";
import { randomUUID } from "crypto";
import { z, ZodRawShape } from 'zod';
import { DynamoDBPut } from "../dynamodb-types";

type Input = Omit<ICreateMeasurementInput, "memberId">

const schema = z.object({
    fat: z.preprocess(i => Number(i) || undefined, z.number().min(1).max(100).optional()),
    weight: z.preprocess(i => Number(i) || undefined, z.number().min(1).optional()),
    height: z.preprocess(i => Number(i) || undefined, z.number().min(1).optional()),
    heart_rate: z.preprocess(i => Number(i) || undefined, z.number().min(1).max(300).optional()),
}).refine((data) => {
    // Check that at least one property is present (not undefined or null)
    return Object.values(data).some(value => value !== undefined && value !== null);
}, {
    message: "At least one property must be provided"
});

export const createMeasurementPayload: (memberId: string, input: Input) => DynamoDBPut<IMeasurement> = (memberId, input) => {

    const validate = schema.safeParse(input)
    if (!validate.success) {
        throw new Error(validate.error.errors.at(0)?.message)
    }

    const Item = {
        memberId,
        ...input,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: randomUUID(),
        tenantId: process.env.TENANT_ID
    } satisfies IMeasurement

    return {
        TableName: "MeasurementTable",
        Item: Item,
        type: "put"
    }
}