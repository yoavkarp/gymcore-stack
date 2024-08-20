import mongoose from "mongoose";
import { z } from "zod";
export declare const measurementSchema: z.ZodObject<z.objectUtil.extendShape<{
    height: z.ZodNumber;
    weight: z.ZodNumber;
    fat: z.ZodNumber;
    resthr: z.ZodNumber;
    age: z.ZodNumber;
    memberId: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    trainerId: z.ZodOptional<z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>>;
    clubId: z.ZodOptional<z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>>;
}, {
    created_at: z.ZodDefault<z.ZodNumber>;
    updated_at: z.ZodDefault<z.ZodNumber>;
    created_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    updated_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
}>, "strip", z.ZodTypeAny, {
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    height: number;
    weight: number;
    fat: number;
    resthr: number;
    age: number;
    memberId: mongoose.Types.ObjectId;
    trainerId?: mongoose.Types.ObjectId | undefined;
    clubId?: mongoose.Types.ObjectId | undefined;
}, {
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    height: number;
    weight: number;
    fat: number;
    resthr: number;
    age: number;
    memberId: mongoose.Types.ObjectId;
    created_at?: number | undefined;
    updated_at?: number | undefined;
    trainerId?: mongoose.Types.ObjectId | undefined;
    clubId?: mongoose.Types.ObjectId | undefined;
}>;
export type IMeasurement = z.infer<typeof measurementSchema>;
export type MeasurementDocument = mongoose.HydratedDocument<IMeasurement>;
export declare const getMeasurementModel: import("../types/mongoose-model").GetModel<{
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    height: number;
    weight: number;
    fat: number;
    resthr: number;
    age: number;
    memberId: mongoose.Types.ObjectId;
    trainerId?: mongoose.Types.ObjectId | undefined;
    clubId?: mongoose.Types.ObjectId | undefined;
}>;
