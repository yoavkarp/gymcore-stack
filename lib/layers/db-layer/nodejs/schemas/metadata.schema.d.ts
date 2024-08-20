import mongoose from "mongoose";
import { z } from "zod";
export declare const metadataSchema: z.ZodObject<{
    created_at: z.ZodDefault<z.ZodNumber>;
    updated_at: z.ZodDefault<z.ZodNumber>;
    created_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    updated_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
}, "strip", z.ZodTypeAny, {
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
}, {
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    created_at?: number | undefined;
    updated_at?: number | undefined;
}>;
export type IMetadata = z.infer<typeof metadataSchema>;
