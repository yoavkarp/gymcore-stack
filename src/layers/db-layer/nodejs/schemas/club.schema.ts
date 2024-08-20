import mongoose, { Model } from "mongoose";
import { Metadata } from "@/layers/db-layer/nodejs/types/docs.types";
import { metadataSchema } from "./metadata.schema";
import { z } from "zod";
import { createModel } from "@/layers/db-layer/nodejs/utils/createModel"

export const clubSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    logo: z.string().url().optional(),
    address: z.string().min(2, "Address must be at least 2 characters long").max(100, "Address cannot exceed 100 characters"),
    state: z.string().min(2, "State must be at least 2 characters long").max(50, "State cannot exceed 50 characters"),
    tenantId: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid tenantId"),
})
    .merge(metadataSchema)

export type IClub = z.infer<typeof clubSchema>;
export type ClubDocument = mongoose.HydratedDocument<IClub>;

export const getClubModel = createModel<IClub>("Club")