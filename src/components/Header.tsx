"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto rounded-full w-full max-w-5xl transition-all duration-500 ease-in-out ${
            scrolled
              ? "bg-[#0b0f17]/70 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_rgba(168,85,247,0.12)] py-3 px-6"
              : "bg-[#0b0f17]/40 backdrop-blur-md border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] py-3.5 px-6"
          }`}
        >
          <div className="flex flex-row items-center justify-between w-full">

            {/* Logo */}
            <Link href="#home" className="flex items-center gap-2 group">
              <Image 
                src="/logo.png" 
                alt="BW Logo" 
                width={36} 
                height={36} 
                className="h-8 w-8 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-white font-bold text-lg tracking-tight transition-colors group-hover:text-purple-300 hidden sm:block">Block Web</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#bdb7c8] hover:text-purple-300 hover:opacity-100 opacity-90 transition-all duration-300 hover:-translate-y-[2px]"
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
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-6 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:brightness-110 transition-all duration-300"
              >
                Login
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#bdb7c8] hover:text-white transition-colors"
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[5.5rem] left-4 right-4 z-40 md:hidden rounded-2xl bg-[#0b0f17]/95 backdrop-blur-xl border border-purple-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-lg font-medium text-[#bdb7c8] hover:text-purple-400 transition-colors py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  setAuthOpen(true);
                  setMobileOpen(false);
                }}
                className="mt-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-semibold rounded-full hover:brightness-110 transition-all w-full"
              >
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}