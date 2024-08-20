import { IClub } from "@/schemas/club.schema";
import { IMeasurement } from "@/schemas/measurement.schema";
import { ITenant } from "@/schemas/tenant.schema";
import { IUser } from "@/schemas/user.schema";
import { IWorkout } from "@/schemas/workout.schema";
import mongoose from "mongoose";

declare module 'mongoose' {
    interface Models {
        Tenant?: Model<ITenant>;
        Club?: Model<IClub>;
        User?: Model<IUser>;
        Measurement?: Model<IMeasurement>;
        Workout?: Model<IWorkout>;
    }
}