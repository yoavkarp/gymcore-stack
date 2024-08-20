import mongoose from "mongoose";
import { z } from "zod";
declare const UserRoles: readonly ["invited", "admin", "member", "trainer"];
export type UserRole = typeof UserRoles[number];
export declare const userSchema: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    email: z.ZodString;
    birthdate: z.ZodString;
    role: z.ZodEnum<["invited", "admin", "member", "trainer"]>;
    clubs: z.ZodDefault<z.ZodArray<z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>, "many">>;
    phone_number: z.ZodEffects<z.ZodString, string, string>;
    address: z.ZodString;
}, {
    created_at: z.ZodDefault<z.ZodNumber>;
    updated_at: z.ZodDefault<z.ZodNumber>;
    created_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    updated_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
}>, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    birthdate: string;
    role: "admin" | "trainer" | "member" | "invited";
    clubs: mongoose.Types.ObjectId[];
    phone_number: string;
}, {
    name: string;
    email: string;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    birthdate: string;
    role: "admin" | "trainer" | "member" | "invited";
    phone_number: string;
    created_at?: number | undefined;
    updated_at?: number | undefined;
    clubs?: mongoose.Types.ObjectId[] | undefined;
}>;
export type IUser = z.infer<typeof userSchema>;
export type UserDocument = mongoose.HydratedDocument<IUser>;
export declare const getUserModel: import("../types/mongoose-model").GetModel<{
    name: string;
    email: string;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    address: string;
    birthdate: string;
    role: "admin" | "trainer" | "member" | "invited";
    clubs: mongoose.Types.ObjectId[];
    phone_number: string;
}>;
export {};
