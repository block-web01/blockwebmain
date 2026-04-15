import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { getInquiries, deleteInquiry, updateInquiryStatus } from "@/lib/jsonStorage";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if user is admin (either ADMIN_EMAIL or hardcoded admin)
    const isAdmin = session.user?.email === process.env.ADMIN_EMAIL || 
                    session.user?.email === "the5sfounder@gmail.com";
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let inquiries: Array<Record<string, unknown>> = [];
    
    // Try local JSON first (guaranteed to work)
    inquiries = await getInquiries();

    // Then try to append from MongoDB if possible
    try {
      await connectDB();
      const mongoInquiries = await Inquiry.find({}).sort({ createdAt: -1 });
      // Logic to merge or uniquely add can be added if needed
      // For now, if we have mongo data, it might be more complete
      if (mongoInquiries.length > 0 && inquiries.length === 0) {
        inquiries = mongoInquiries;
      }
    } catch {
      console.warn("MongoDB fetch failed, using local JSON only");
    }

    return NextResponse.json(inquiries);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if user is admin
    const isAdmin = session.user?.email === process.env.ADMIN_EMAIL || 
                    session.user?.email === "the5sfounder@gmail.com";
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    
    // Delete from JSON
    await deleteInquiry(id);

    // Try deleting from MongoDB
    try {
      await connectDB();
      await Inquiry.findByIdAndDelete(id);
    } catch {}

    return NextResponse.json({ message: "Inquiry deleted" });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if user is admin
    const isAdmin = session.user?.email === process.env.ADMIN_EMAIL || 
                    session.user?.email === "the5sfounder@gmail.com";
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();
    
    // Update JSON
    await updateInquiryStatus(id, status);

    // Try updating MongoDB
    try {
      await connectDB();
      await Inquiry.findByIdAndUpdate(id, { status });
    } catch {}

    return NextResponse.json({ message: "Inquiry updated" });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}
