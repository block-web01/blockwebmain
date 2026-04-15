"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { X, Loader2, AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
        } else {
          // Check if it's the admin
          if (email === "the5sfounder@gmail.com") {
            router.push("/admin/dashboard");
          } else {
            router.refresh(); // Or redirect to home
          }
          onClose();
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    } else {
      // Sign Up logic - call the existing register API
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          // Success - automatically log in
          const loginResult = await signIn("credentials", { email, password, redirect: false });
          if (loginResult?.error) {
            setError("Registration successful, but auto-login failed. Please log in.");
          } else {
            router.refresh();
            onClose();
          }
        } else {
          setError(data.message || "Registration failed");
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className="relative w-[90%] max-w-md p-8 rounded-2xl bg-[#0a0610] border border-[rgba(124,58,237,0.2)] shadow-[0_0_60px_rgba(124,58,237,0.3)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <p className="text-sm text-[#bdb7c8] mb-6">
                {isLogin ? "Login to your account" : "Sign up to get started"}
              </p>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white focus:outline-none focus:border-[#7c3aed] transition-colors"
                  />
                )}

                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white focus:outline-none focus:border-[#7c3aed] transition-colors"
                />

                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white focus:outline-none focus:border-[#7c3aed] transition-colors"
                />

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs py-1">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4 text-xs font-bold text-[#bdb7c8]/30 uppercase tracking-widest">
                <div className="h-px w-full bg-[#bdb7c8]/10" />
                OR
                <div className="h-px w-full bg-[#bdb7c8]/10" />
              </div>

              {/* Google */}
              <button
                onClick={() => signIn("google")}
                className="w-full py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all text-sm"
              >
                <Image src="https://www.google.com/favicon.ico" alt="Google" width={16} height={16} className="w-4 h-4" />
                Continue with Google
              </button>

              {/* Switch */}
              <p className="text-sm text-center text-[#bdb7c8] mt-8">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="ml-2 text-[#8b5cf6] font-bold hover:underline"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}