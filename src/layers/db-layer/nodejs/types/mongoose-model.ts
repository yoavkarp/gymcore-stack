import { Model, Types, Connection } from "mongoose";

export type GetModel<T> = (tenantId: Types.ObjectId, conn: Connection) => Model<T>