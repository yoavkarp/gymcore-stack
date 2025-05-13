import { ICreateMemberInput, IMeasurement, IMember } from "@/appsync/schema";
import { dynamodb } from "../connection";
import { z } from 'zod';
import { DynamoDBPut } from "../dynamodb-types";
import { createMeasurementPayload } from "./createMeasurementPayload";

type Input = ICreateMemberInput

const schema = z.object({
    address: z.string().optional(),
    birthdate: z.string().date(),
    email: z.string().email().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    name: z.string().min(2).max(50),
    phone_number: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number")
})

type Result = [DynamoDBPut<IMember>, DynamoDBPut<IMeasurement>] | DynamoDBPut<IMember>;

export const createMemberPayload: (tenantId: string, id: string, input: Input) => Promise<Result> = async (tenantId, id, input) => {

    const validate = schema.safeParse(input)
    if (!validate.success) {
        throw new Error(validate.error.errors.at(0)?.message)
    }

    let measurementPayload: DynamoDBPut<IMeasurement> | undefined;

    if (input.measurement) {
        measurementPayload = createMeasurementPayload(tenantId, id, input.measurement);
    }

    const Item = {
        ...input,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id,
        tenantId,
        measurement: measurementPayload?.Item
    } satisfies IMember

    const result: Result = {
        TableName: "MemberTable",
        Item: Item,
        type: "put"
    }

    if (measurementPayload) {
        return [result, measurementPayload]
    }

    return result;

}