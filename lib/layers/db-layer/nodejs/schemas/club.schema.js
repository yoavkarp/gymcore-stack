"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClubModel = exports.clubSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const metadata_schema_1 = require("./metadata.schema");
const zod_1 = require("zod");
const createModel_1 = require("@/layers/db-layer/nodejs/utils/createModel");
exports.clubSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    logo: zod_1.z.string().url().optional(),
    address: zod_1.z.string().min(2, "Address must be at least 2 characters long").max(100, "Address cannot exceed 100 characters"),
    state: zod_1.z.string().min(2, "State must be at least 2 characters long").max(50, "State cannot exceed 50 characters"),
    tenantId: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid tenantId"),
})
    .merge(metadata_schema_1.metadataSchema);
exports.getClubModel = (0, createModel_1.createModel)("Club");
