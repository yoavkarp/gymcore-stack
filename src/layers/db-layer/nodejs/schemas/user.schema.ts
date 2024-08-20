import mongoose from "mongoose";
import { z } from "zod";
import { metadataSchema } from "./metadata.schema";
import { createModel } from "@/layers/db-layer/nodejs/utils/createModel"

const UserRoles = ["invited", "admin", "member", "trainer"] as const;
export type UserRole = typeof UserRoles[number];

export const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    email: z.string().email("Invalid email address"),
    birthdate: z.string().date("Invalid birthdate"),
    role: z.enum(UserRoles),
    clubs: z.array(z.instanceof(mongoose.Types.ObjectId)).default([]),
    phone_number: z.string().refine(val => {
        if ((val.startsWith("+9725") && val.length === 13) || (val.startsWith("+97205") && val.length === 14)) return true;
        return false;
    }, "Invalid phone number"),
    address: z.string().min(2, "Address must be at least 2 characters long").max(100, "Address cannot exceed 100 characters"),
})
    .merge(metadataSchema)

export type IUser = z.infer<typeof userSchema>;
export type UserDocument = mongoose.HydratedDocument<IUser>;

export const getUserModel = createModel<IUser>("User")