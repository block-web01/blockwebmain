"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className="relative w-[90%] max-w-md p-8 rounded-2xl bg-[#0a0610] border border-[rgba(124,58,237,0.2)] shadow-[0_0_60px_rgba(124,58,237,0.3)]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
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
              <form autoComplete="off" className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Your Name"
                    autoComplete="off"
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="new-email"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white"
                />

                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white"
                />

                {/* Submit */}
                <button
                  type="button"
                  className="w-full py-3 rounded-xl bg-linear-to-r from-[#8b5cf6] to-[#5b21b6] text-white font-semibold"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 text-center text-sm text-[#bdb7c8]">
                OR
              </div>

              {/* Google */}
              <button
                onClick={() => signIn("google")}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold"
              >
                Continue with Google
              </button>

              {/* Switch */}
              <p className="text-sm text-center text-[#bdb7c8] mt-6">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-[#8b5cf6] font-semibold"
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