import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Missing email or otp" }, { status: 400 });
  }

  const result = verifyOtp(email, otp);

  if (result === "ok") {
    return NextResponse.json({ success: true });
  }

  const messages: Record<string, string> = {
    invalid: "Incorrect code. Please try again.",
    expired: "This code has expired. Please request a new one.",
    max_attempts: "Too many failed attempts. Please request a new code.",
  };

  return NextResponse.json({ error: messages[result] ?? "Verification failed." }, { status: 400 });
}
