import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await connectDB();

      // Find the user
      const user = await User.findOne({ email: session.user.email }).select(
        "name email lastLogin loginHistory"
      );
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          lastLogin: user.lastLogin,
          loginHistory: user.loginHistory,
          totalLogins: user.loginHistory?.length || 0,
        },
      });
    } catch (error) {
      console.error("MongoDB fetch failed:", error);
      return NextResponse.json(
        { error: "Failed to fetch login history" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
