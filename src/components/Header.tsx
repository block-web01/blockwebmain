"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "./AuthModal";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#founders" },
  { label: "Pricing", href: "#pricing" },
];

export default function Header() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
              {status === "loading" ? (
                <div className="px-6 py-2 text-sm font-semibold text-[#bdb7c8]">...</div>
              ) : session ? (
                <div className="flex items-center gap-4 relative">
                  {(session.user as any)?.role === "admin" && (
                    <Link href="/admin/dashboard" className="text-sm font-medium border border-purple-500 px-4 py-1.5 rounded-full text-purple-400 hover:text-white hover:bg-purple-500 transition-all">
                      Admin Panel
                    </Link>
                  )}
                  
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all focus:outline-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-inner">
                        {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={16} />}
                      </div>
                      <span className="text-sm font-medium text-white max-w-[100px] truncate hidden md:block">{session.user?.name || "User"}</span>
                      <ChevronDown size={14} className={`text-[#bdb7c8] transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-3 w-64 bg-[#0b0f17]/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-[100] flex flex-col"
                        >
                          <div className="p-4 border-b border-white/5 bg-white/5 flex flex-col gap-1">
                            <p className="text-sm font-semibold text-white truncate">{session.user?.name || "User"}</p>
                            <p className="text-xs text-[#bdb7c8] truncate">{session.user?.email || "No email"}</p>
                          </div>
                          
                          <div className="p-2">
                            <button
                              onClick={() => {
                                setProfileOpen(false);
                                signOut();
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                            >
                              <LogOut size={16} />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <motion.button
                  onClick={() => setAuthOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="px-6 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:brightness-110 transition-all duration-300"
                >
                  Login
                </motion.button>
              )}
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

              {status === "loading" ? (
                <div className="mt-4 py-3 text-center text-[#bdb7c8]">Loading...</div>
              ) : session ? (
                <div className="flex flex-col gap-2 mt-2 bg-[#1a1525]/50 border border-purple-500/10 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={24} />}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-base font-bold text-white truncate">{session.user?.name || "User"}</span>
                      <span className="text-xs text-[#bdb7c8] truncate mt-0.5">{session.user?.email || "No email"}</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10 w-full my-2" />

                  {(session.user as any)?.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-center text-sm tracking-wide text-purple-400 font-bold rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all w-full mb-1"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="flex justify-center items-center gap-2 py-3 text-sm tracking-wide text-red-400 font-bold rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all w-full"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthOpen(true);
                    setMobileOpen(false);
                  }}
                  className="mt-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-semibold rounded-full hover:brightness-110 transition-all w-full"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}