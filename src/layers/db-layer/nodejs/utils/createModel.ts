import { GetModel } from "@/layers/db-layer/nodejs/types/mongoose-model";
import mongoose from "mongoose";

export const createModel = <T = any>(modelName: string): GetModel<T> => {
    return (tenantId, conn = mongoose.connection) => {
        return conn.models[`${modelName}_${tenantId}`] || conn.model(`${modelName}_${tenantId}`);
    }
}