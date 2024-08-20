import mongoose from "mongoose";
import { z } from "zod";
export declare const clubSchema: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    logo: z.ZodOptional<z.ZodString>;
    address: z.ZodString;
    state: z.ZodString;
    tenantId: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
}, {
    created_at: z.ZodDefault<z.ZodNumber>;
    updated_at: z.ZodDefault<z.ZodNumber>;
    created_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    updated_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
}>, "strip", z.ZodTypeAny, {
    tenantId: mongoose.Types.ObjectId;
    name: string;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    state: string;
    logo?: string | undefined;
}, {
    tenantId: mongoose.Types.ObjectId;
    name: string;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    state: string;
    created_at?: number | undefined;
    updated_at?: number | undefined;
    logo?: string | undefined;
}>;
export type IClub = z.infer<typeof clubSchema>;
export type ClubDocument = mongoose.HydratedDocument<IClub>;
export declare const getClubModel: import("../types/mongoose-model").GetModel<{
    tenantId: mongoose.Types.ObjectId;
    name: string;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    state: string;
    logo?: string | undefined;
}>;
