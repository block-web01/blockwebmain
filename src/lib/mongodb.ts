import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/User";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

/* ✅ Proper Type (NO any) */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

/* ✅ Safe global cache */
const cached: MongooseCache =
  global.mongoose ?? { conn: null, promise: null };

global.mongoose = cached;

async function seedAdmin() {
  try {
    const adminEmail = "the5sfounder@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const adminPassword = "admin@Blockweb3";
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: "The 5s Founder",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        lastLogin: new Date(),
        loginHistory: []
      });
      console.log("Database seeded: Admin user created successfully.");
    }
  } catch (err) {
    console.error("Admin seeding error:", err);
  }
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(async (conn) => {
      await seedAdmin();
      return conn;
    }).catch((err) => {
      cached.promise = null;
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}