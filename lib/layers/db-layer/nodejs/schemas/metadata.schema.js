"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.metadataSchema = zod_1.z.object({
    created_at: zod_1.z.number().int("Must be an integer").min(0, "Minimum 0").default(() => Date.now()),
    updated_at: zod_1.z.number().int("Must be an integer").min(0, "Minimum 0").default(() => Date.now()),
    created_by: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid uid (created_by)"),
    updated_by: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid uid (updated_by)"),
});
