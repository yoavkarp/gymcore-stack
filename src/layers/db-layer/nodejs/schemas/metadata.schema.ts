import mongoose from "mongoose";
import { z } from "zod";

export const metadataSchema = z.object({
    created_at: z.number().int("Must be an integer").min(0, "Minimum 0").default(() => Date.now()),
    updated_at: z.number().int("Must be an integer").min(0, "Minimum 0").default(() => Date.now()),
    created_by: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid uid (created_by)"),
    updated_by: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid uid (updated_by)"),
})

export type IMetadata = z.infer<typeof metadataSchema>;