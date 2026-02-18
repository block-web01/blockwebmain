"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#founders" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07030a]/80 backdrop-blur-xl border-b border-[rgba(124,58,237,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] flex items-center justify-center font-black text-white text-sm">
                5
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              The 5
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#bdb7c8] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-shadow duration-300"
            >
              Book a Call
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white rounded-full origin-center"
              />
            </div>
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#07030a]/95 backdrop-blur-xl border-b border-[rgba(124,58,237,0.1)]"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-[#bdb7c8] hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 block text-center px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6]"
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
