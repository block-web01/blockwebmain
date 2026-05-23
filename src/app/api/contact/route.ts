import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import User from "@/models/User";
import { saveInquiry } from "@/lib/jsonStorage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Always save to JSON fallback for "Basic" working version
    const newInquiryLocal = await saveInquiry(body);

    try {
      await connectDB();
      
      // Get session to check if user is authenticated
      const session = await getServerSession(authOptions);
      let userId = null;
      
      // If user is authenticated, find and link their user ID
      if (session?.user?.email) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          userId = user._id;
        }
      }
      
      const newInquiry = new Inquiry({
        userId: userId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        service: body.service,
        slot1: body.slot1,
        slot2: body.slot2,
      });
      await newInquiry.save();
    } catch (dbErr) {
      console.error("MongoDB save failed, but saved to local JSON:", dbErr);
    }

    return NextResponse.json({ message: "Inquiry submitted successfully", id: newInquiryLocal._id }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}

