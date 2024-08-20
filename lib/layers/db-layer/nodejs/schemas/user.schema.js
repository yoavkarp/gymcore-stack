"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const metadata_schema_1 = require("./metadata.schema");
const createModel_1 = require("@/layers/db-layer/nodejs/utils/createModel");
const UserRoles = ["invited", "admin", "member", "trainer"];
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    birthdate: zod_1.z.string().date("Invalid birthdate"),
    role: zod_1.z.enum(UserRoles),
    clubs: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).default([]),
    phone_number: zod_1.z.string().refine(val => {
        if ((val.startsWith("+9725") && val.length === 13) || (val.startsWith("+97205") && val.length === 14))
            return true;
        return false;
    }, "Invalid phone number"),
    address: zod_1.z.string().min(2, "Address must be at least 2 characters long").max(100, "Address cannot exceed 100 characters"),
})
    .merge(metadata_schema_1.metadataSchema);
exports.getUserModel = (0, createModel_1.createModel)("User");
