import mongoose from "mongoose";
import { metadataSchema } from "./metadata.schema";
import { z } from "zod";
import { createModel } from "@/layers/db-layer/nodejs/utils/createModel"

export const exerciseSchemaZod = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    video: z.string().url().optional(),
})
    .merge(metadataSchema)

export type IExercise = z.infer<typeof exerciseSchemaZod>;
export type ExerciseDocument = mongoose.HydratedDocument<IExercise>;

export const getExerciseModel = createModel<IExercise>("Exercise")