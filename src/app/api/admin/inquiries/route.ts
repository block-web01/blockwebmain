import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { getInquiries, deleteInquiry, updateInquiryStatus } from "@/lib/jsonStorage";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to database and try to fetch inquiries from MongoDB
    try {
      await connectDB();
      const mongoInquiries = await Inquiry.find({})
        .populate("userId", "name email lastLogin loginHistory")
        .sort({ createdAt: -1 });

      return NextResponse.json(mongoInquiries);
    } catch (mongoErr) {
      console.warn("MongoDB fetch failed, trying local JSON fallback:", mongoErr);
      
      // Fallback to local JSON if MongoDB is down
      const inquiries = await getInquiries();
      return NextResponse.json(inquiries);
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    
    // 1. Delete from MongoDB primarily
    await connectDB();
    await Inquiry.findByIdAndDelete(id);

    // 2. Delete from fallback local JSON as well
    try {
      await deleteInquiry(id);
    } catch (jsonErr) {
      console.warn("Fallback JSON delete failed:", jsonErr);
    }

    return NextResponse.json({ message: "Inquiry deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();
    
    // 1. Update MongoDB primarily
    await connectDB();
    await Inquiry.findByIdAndUpdate(id, { status });

    // 2. Update fallback local JSON as well
    try {
      await updateInquiryStatus(id, status);
    } catch (jsonErr) {
      console.warn("Fallback JSON update failed:", jsonErr);
    }

    return NextResponse.json({ message: "Inquiry updated successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
