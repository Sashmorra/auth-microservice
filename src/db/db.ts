import mongoose from "mongoose";
import { ApiError } from "../infrastructure/errors/error";


const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
      throw new ApiError("Failed to connect to Database", 500);
  }
}

export { connectToDB };
