import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { saveInquiry } from "@/lib/jsonStorage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Always save to JSON fallback for "Basic" working version
    const newInquiryLocal = await saveInquiry(body);

    try {
      await connectDB();
      const newInquiry = new Inquiry({
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

