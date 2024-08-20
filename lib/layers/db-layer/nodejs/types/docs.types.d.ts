import mongoose from "mongoose";
export type Metadata = {
    _id: mongoose.Types.ObjectId;
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
};
