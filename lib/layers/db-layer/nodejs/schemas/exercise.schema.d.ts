import mongoose from "mongoose";
import { z } from "zod";
export declare const exerciseSchemaZod: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    video: z.ZodOptional<z.ZodString>;
}, {
    created_at: z.ZodDefault<z.ZodNumber>;
    updated_at: z.ZodDefault<z.ZodNumber>;
    created_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    updated_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    video?: string | undefined;
}, {
    name: string;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    created_at?: number | undefined;
    updated_at?: number | undefined;
    video?: string | undefined;
}>;
export type IExercise = z.infer<typeof exerciseSchemaZod>;
export type ExerciseDocument = mongoose.HydratedDocument<IExercise>;
export declare const getExerciseModel: import("../types/mongoose-model").GetModel<{
    name: string;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    video?: string | undefined;
}>;
