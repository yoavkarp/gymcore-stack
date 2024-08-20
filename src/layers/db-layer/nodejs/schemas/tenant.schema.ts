import mongoose from "mongoose";
import { z } from "zod";
import { metadataSchema } from "./metadata.schema";
import { createModel } from "@/layers/db-layer/nodejs/utils/createModel"

export const tenantSchemaZod = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    logo: z.string().url().optional(),
    address: z.string().min(2, "Address must be at least 2 characters long").max(100, "Address cannot exceed 100 characters"),
    state: z.string().min(2, "State must be at least 2 characters long").max(50, "State cannot exceed 50 characters"),
})
    .merge(metadataSchema)

export type ITenant = z.infer<typeof tenantSchemaZod>;
export type TenantDocument = mongoose.HydratedDocument<ITenant>;

export const getTenantModel = createModel<ITenant>("Tenant")