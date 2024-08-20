import mongoose from "mongoose";
import { z } from "zod";

const zodMongoose = z.custom<mongoose.Types.ObjectId>(val => mongoose.Types.ObjectId.isValid(val))