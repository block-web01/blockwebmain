import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    // Fetch all regular users, exclude passwords
    const users = await User.find({ email: { $ne: "the5sfounder@gmail.com" } })
      .select('_id name email lastLogin loginHistory createdAt')
      .sort({ lastLogin: -1 });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
