import mongoose, { Schema } from "mongoose";
import { Metadata } from "@/layers/db-layer/nodejs/types/docs.types";
import { z } from "zod";
import { metadataSchema } from "./metadata.schema";
import { createModel } from "@/layers/db-layer/nodejs/utils/createModel"

export const measurementSchema = z.object({
    height: z.number().int("Must be an integer").min(10, "Minimum 10").max(300, "Maximum 300"),
    weight: z.number().int("Must be an integer").min(5, "Minimum 5").max(500, "Maximum 500"),
    fat: z.number().int("Must be an integer").min(0, "Minimum 0").max(100, "Maximum 100"),
    resthr: z.number().int("Must be an integer").min(30, "Minimum 30").max(500, "Maximum 500"),
    age: z.number().int("Must be an integer").min(0, "Minimum 0").max(150, "Maximum 150"),
    memberId: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid memberId"),
    trainerId: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid trainerId").optional(),
    clubId: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid clubId").optional(),
})
    .merge(metadataSchema);

export type IMeasurement = z.infer<typeof measurementSchema>;
export type MeasurementDocument = mongoose.HydratedDocument<IMeasurement>;

export const getMeasurementModel = createModel<IMeasurement>("Measurement")