import { GetModel } from "@/layers/db-layer/nodejs/types/mongoose-model";
export declare const createModel: <T = any>(modelName: string) => GetModel<T>;
