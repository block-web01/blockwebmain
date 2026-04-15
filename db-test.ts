import { connectDB } from "./src/lib/mongodb";
import mongoose from "mongoose";

async function test() {
  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("Connected!");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
