"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExerciseModel = exports.exerciseSchemaZod = void 0;
const metadata_schema_1 = require("./metadata.schema");
const zod_1 = require("zod");
const createModel_1 = require("@/layers/db-layer/nodejs/utils/createModel");
exports.exerciseSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    video: zod_1.z.string().url().optional(),
})
    .merge(metadata_schema_1.metadataSchema);
exports.getExerciseModel = (0, createModel_1.createModel)("Exercise");
