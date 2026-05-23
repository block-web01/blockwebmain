import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import User from "@/models/User";
import { saveInquiry } from "@/lib/jsonStorage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 1. Get session to check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please register or login first." },
        { status: 401 }
      );
    }

    const body = await req.json();

    // 2. Connect to database and find the user
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please log in again." },
        { status: 404 }
      );
    }

    // 3. Create and save query to MongoDB
    const newInquiry = new Inquiry({
      userId: user._id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      service: body.service,
      slot1: body.slot1,
      slot2: body.slot2,
    });
    
    await newInquiry.save();

    // 4. Fallback save to local JSON for retro-compatibility
    try {
      await saveInquiry({
        ...body,
        userId: user._id.toString(),
        _id: newInquiry._id.toString(),
      });
    } catch (jsonErr) {
      console.error("Local JSON save fallback failed:", jsonErr);
    }

    return NextResponse.json(
      { message: "Inquiry submitted successfully", id: newInquiry._id.toString() },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

