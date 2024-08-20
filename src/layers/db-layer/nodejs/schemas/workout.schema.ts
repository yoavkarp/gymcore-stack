import mongoose from "mongoose";
import { z } from "zod";
import { metadataSchema } from "./metadata.schema";
import { createModel } from "@/layers/db-layer/nodejs/utils/createModel"

export const rangedSchema = z.object({
    min: z.number().min(1).optional(),
    max: z.number().min(1).optional(),
    u: z.string().trim().min(2, "Units must be at least 2 characters long").max(50, "Units cannot exceed 100 characters").optional(),
})
    .refine(data => {
        if (data.min && data.max) {
            return data.min < data.max;
        }
        return true;
    }, "Minimum value must be less than maximum value")

export const cardioDataSchema = z.object({
    angle: rangedSchema.optional(),
    dis: rangedSchema.optional(),
    intens: rangedSchema.optional(),
    resist: rangedSchema.optional(),
    rest: rangedSchema.optional(),
    tempo: rangedSchema.optional(),
    thr: rangedSchema.optional(),
    time: rangedSchema.optional(),
    weight: rangedSchema.optional(),
})

export const strengthDataSchema = z.object({
    dropsets: z.array(z.object({
        reps: rangedSchema.optional(),
        weight: rangedSchema.optional(),
    })).default([]),
    reps: rangedSchema.optional(),
    rest: rangedSchema.optional(),
    time: rangedSchema.optional(),
    weight: rangedSchema.optional(),
})

export const workoutExerciseSchema = z.object({
    data: z.array(cardioDataSchema).or(z.array(strengthDataSchema)).default([]),
    notes: z.string().optional(),
    exerciseId: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid exerciseId"),
    mn: z.string().optional(),
    name: z.string().trim().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 100 characters").optional(),
    sh: z.string().optional(),
    type: z.enum(["cardio", "strength", "warmup", "cooldown"]),
})

export const workoutSchema = z.object({
    clubId: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid clubId"),
    notes: z.string().trim().min(2, "Notes must be at least 2 characters long").max(100, "Notes cannot exceed 100 characters").optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
    member_uid: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid member_uid"),
    name: z.string().trim().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 100 characters").optional(),
    trainer_uid: z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val), "Invalid trainer_uid").optional(),
    exercises: z.array(workoutExerciseSchema).default([]),
})
    .merge(metadataSchema);

export type IWorkout = z.infer<typeof workoutSchema>;
export type ICardioExerciseData = z.infer<typeof cardioDataSchema>;
export type IStrengthExerciseData = z.infer<typeof strengthDataSchema>;
export type IWorkoutExercise = z.infer<typeof workoutExerciseSchema>;

export type WorkoutDocument = mongoose.HydratedDocument<IWorkout>;

export const getWorkoutModel = createModel<IWorkout>("Workout");