"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeasurementModel = exports.measurementSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const metadata_schema_1 = require("./metadata.schema");
const createModel_1 = require("@/layers/db-layer/nodejs/utils/createModel");
exports.measurementSchema = zod_1.z.object({
    height: zod_1.z.number().int("Must be an integer").min(10, "Minimum 10").max(300, "Maximum 300"),
    weight: zod_1.z.number().int("Must be an integer").min(5, "Minimum 5").max(500, "Maximum 500"),
    fat: zod_1.z.number().int("Must be an integer").min(0, "Minimum 0").max(100, "Maximum 100"),
    resthr: zod_1.z.number().int("Must be an integer").min(30, "Minimum 30").max(500, "Maximum 500"),
    age: zod_1.z.number().int("Must be an integer").min(0, "Minimum 0").max(150, "Maximum 150"),
    memberId: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid memberId"),
    trainerId: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid trainerId").optional(),
    clubId: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid clubId").optional(),
})
    .merge(metadata_schema_1.metadataSchema);
exports.getMeasurementModel = (0, createModel_1.createModel)("Measurement");
