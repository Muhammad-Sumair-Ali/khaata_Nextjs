import mongoose from "mongoose";

let isConnected = false;

export async function connectDb() {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not set.");
    }

    await mongoose.connect(mongoUrl);

    isConnected = true; 
    console.log("Connected to MongoDB");

  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error);
  }
}
