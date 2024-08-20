import mongoose from "mongoose";
import { z } from "zod";
export declare const tenantSchemaZod: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    logo: z.ZodOptional<z.ZodString>;
    address: z.ZodString;
    state: z.ZodString;
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
    address: string;
    state: string;
    logo?: string | undefined;
}, {
    name: string;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    state: string;
    created_at?: number | undefined;
    updated_at?: number | undefined;
    logo?: string | undefined;
}>;
export type ITenant = z.infer<typeof tenantSchemaZod>;
export type TenantDocument = mongoose.HydratedDocument<ITenant>;
export declare const getTenantModel: import("../types/mongoose-model").GetModel<{
    name: string;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    state: string;
    logo?: string | undefined;
}>;
