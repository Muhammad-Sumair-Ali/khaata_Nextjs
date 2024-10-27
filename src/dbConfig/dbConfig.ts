import mongoose from "mongoose";

export async function connectDb() {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not set.");
    }

    await mongoose.connect(mongoUrl);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error: " + err);
    });

  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error);
  }
}
