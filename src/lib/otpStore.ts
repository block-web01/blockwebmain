// In-memory OTP store. Each entry expires after 10 minutes.
// For production, replace with Redis or a database.
import crypto from "crypto";

interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}

declare global {
  var __otpStore: Map<string, OtpEntry> | undefined;
}

/* ✅ No eslint-disable needed */
const store: Map<string, OtpEntry> =
  global.__otpStore ?? (global.__otpStore = new Map());

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

export function generateOtp(): string {
  return String(crypto.randomInt(100000, 1000000));
}

export function storeOtp(email: string, otp: string): void {
  store.set(email.toLowerCase(), {
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });
}

export type VerifyResult = "ok" | "invalid" | "expired" | "max_attempts";

export function verifyOtp(email: string, otp: string): VerifyResult {
  const entry = store.get(email.toLowerCase());

  if (!entry) return "expired";

  if (Date.now() > entry.expiresAt) {
    store.delete(email.toLowerCase());
    return "expired";
  }

  if (entry.attempts >= MAX_ATTEMPTS) return "max_attempts";

  entry.attempts += 1;

  const expectedBuffer = Buffer.from(entry.otp);
  const providedBuffer = Buffer.from(String(otp));

  if (expectedBuffer.length !== providedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, providedBuffer)) {
    return "invalid";
  }

  store.delete(email.toLowerCase());
  return "ok";
}