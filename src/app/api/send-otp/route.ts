import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateOtp, storeOtp } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const otp = generateOtp();
  storeOtp(email, otp);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Block Web" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Block Web Meeting Confirmation Code",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0f0b12;border-radius:12px;border:1px solid rgba(124,58,237,0.2)">
          <div style="text-align:center;margin-bottom:24px">
            <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:10px;background:linear-gradient(135deg,#8b5cf6,#5b21b6)">
              <span style="color:#fff;font-size:18px;font-weight:900">BW</span>
            </div>
          </div>
          <h2 style="color:#ffffff;font-size:22px;font-weight:800;text-align:center;margin:0 0 8px">Confirm Your Meeting</h2>
          <p style="color:#bdb7c8;font-size:14px;text-align:center;margin:0 0 32px">Use the code below to confirm your meeting booking with Block Web.</p>
          <div style="background:#1a1525;border:1px solid rgba(124,58,237,0.25);border-radius:10px;padding:24px;text-align:center;margin-bottom:24px">
            <span style="font-size:40px;font-weight:900;letter-spacing:14px;color:#a78bfa">${otp}</span>
          </div>
          <p style="color:#bdb7c8;font-size:12px;text-align:center;margin:0">This code expires in <strong style="color:#fff">10 minutes</strong>. Do not share it with anyone.</p>
          <hr style="border:none;border-top:1px solid rgba(124,58,237,0.1);margin:24px 0"/>
          <p style="color:#bdb7c8;font-size:11px;text-align:center;margin:0">Block Web · Startup Technology Company</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
