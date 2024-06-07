import mongoose from "mongoose";


const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/forum");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

export { connectToDB };
