import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error: " + err);
    });

  } catch (error) {
    console.log("Failed to connect to MongoDB");
    console.log(error);
  }
}
