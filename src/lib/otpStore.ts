// In-memory OTP store. Each entry expires after 10 minutes.
// For production, replace with Redis or a database.

interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, OtpEntry> | undefined;
}

// Use a global so it persists across Next.js hot reloads in dev
const store: Map<string, OtpEntry> =
  global.__otpStore ?? (global.__otpStore = new Map());

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
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

  if (entry.otp !== otp) return "invalid";

  store.delete(email.toLowerCase());
  return "ok";
}
