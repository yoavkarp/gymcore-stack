import mongoose from "mongoose";

export * from "./schemas";
export * as mongoose from "mongoose";

export const connectToDatabase = () => {
    return mongoose.connect('your-mongo-db-uri');
};
