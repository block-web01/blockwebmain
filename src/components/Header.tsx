"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AuthModal from "./AuthModal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#founders" },
  { label: "Pricing", href: "#pricing" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled
            ? "bg-[#07030a]/80 backdrop-blur-xl border-b border-[rgba(124,58,237,0.1)]"
            : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <Link href="#home" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-linear-to-br from-[#8b5cf6] to-[#5b21b6] flex items-center justify-center text-white font-bold">
                BW
              </div>
              <span className="text-white font-bold text-xl">Block Web</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-[#bdb7c8] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <motion.button
                onClick={() => setAuthOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              >
                Login
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#07030a]/95"
            >
              <div className="p-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}

                <button
                  onClick={() => {
                    setAuthOpen(true);
                    setMobileOpen(false);
                  }}
                  className="mt-3 py-3 bg-purple-600 text-white rounded-xl"
                >
                  Sign Up / Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* AUTH MODAL */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}