"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutModel = exports.workoutSchema = exports.workoutExerciseSchema = exports.strengthDataSchema = exports.cardioDataSchema = exports.rangedSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const metadata_schema_1 = require("./metadata.schema");
const createModel_1 = require("@/layers/db-layer/nodejs/utils/createModel");
exports.rangedSchema = zod_1.z.object({
    min: zod_1.z.number().min(1).optional(),
    max: zod_1.z.number().min(1).optional(),
    u: zod_1.z.string().trim().min(2, "Units must be at least 2 characters long").max(50, "Units cannot exceed 100 characters").optional(),
})
    .refine(data => {
    if (data.min && data.max) {
        return data.min < data.max;
    }
    return true;
}, "Minimum value must be less than maximum value");
exports.cardioDataSchema = zod_1.z.object({
    angle: exports.rangedSchema.optional(),
    dis: exports.rangedSchema.optional(),
    intens: exports.rangedSchema.optional(),
    resist: exports.rangedSchema.optional(),
    rest: exports.rangedSchema.optional(),
    tempo: exports.rangedSchema.optional(),
    thr: exports.rangedSchema.optional(),
    time: exports.rangedSchema.optional(),
    weight: exports.rangedSchema.optional(),
});
exports.strengthDataSchema = zod_1.z.object({
    dropsets: zod_1.z.array(zod_1.z.object({
        reps: exports.rangedSchema.optional(),
        weight: exports.rangedSchema.optional(),
    })).default([]),
    reps: exports.rangedSchema.optional(),
    rest: exports.rangedSchema.optional(),
    time: exports.rangedSchema.optional(),
    weight: exports.rangedSchema.optional(),
});
exports.workoutExerciseSchema = zod_1.z.object({
    data: zod_1.z.array(exports.cardioDataSchema).or(zod_1.z.array(exports.strengthDataSchema)).default([]),
    notes: zod_1.z.string().optional(),
    exerciseId: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid exerciseId"),
    mn: zod_1.z.string().optional(),
    name: zod_1.z.string().trim().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 100 characters").optional(),
    sh: zod_1.z.string().optional(),
    type: zod_1.z.enum(["cardio", "strength", "warmup", "cooldown"]),
});
exports.workoutSchema = zod_1.z.object({
    clubId: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid clubId"),
    notes: zod_1.z.string().trim().min(2, "Notes must be at least 2 characters long").max(100, "Notes cannot exceed 100 characters").optional(),
    level: zod_1.z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
    member_uid: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid member_uid"),
    name: zod_1.z.string().trim().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 100 characters").optional(),
    trainer_uid: zod_1.z.custom(val => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid trainer_uid").optional(),
    exercises: zod_1.z.array(exports.workoutExerciseSchema).default([]),
})
    .merge(metadata_schema_1.metadataSchema);
exports.getWorkoutModel = (0, createModel_1.createModel)("Workout");
