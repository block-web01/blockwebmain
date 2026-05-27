"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "./AuthModal";
import { QueryHistoryModal } from "./QueryHistoryModal";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, ChevronDown, MessageSquare, PhoneCall, ShieldAlert, Laptop, Menu, X } from "lucide-react";

export default function Header() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [queryHistoryOpen, setQueryHistoryOpen] = useState(false);

  // Mobile dropdown toggles
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "needs_signup") {
      setAuthMode("signup");
      setAuthError("This Google account is not registered. Please sign up first.");
      setAuthOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none w-full">
        <header
          className={`pointer-events-auto rounded-full w-full max-w-7xl transition-all duration-500 ease-in-out ${
            scrolled || mobileOpen
              ? "bg-[#0b0f17]/75 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] py-2 px-6"
              : "bg-[#0b0f17]/40 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.3)] py-3 px-6"
          }`}
        >
          <div className="flex items-center justify-between w-full">
          {/* Logo Section */}
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 group z-50"
          >
            <div className="relative overflow-hidden rounded-full h-9 w-9">
              <Image
                src="/logo.png"
                alt="Block Web Logo"
                width={36}
                height={36}
                className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight transition-colors group-hover:text-purple-300">
              Block Web
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#home"
              className="text-sm font-medium text-slate-300 hover:text-white nav-link-underline transition-colors py-1"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="desktop-dropdown py-1">
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white cursor-pointer transition-colors focus:outline-none">
                Services
                <ChevronDown size={14} className="dropdown-icon transition-transform duration-300 text-slate-400" />
              </button>
              
              <div className="desktop-dropdown-menu absolute top-full left-1/2 mt-3 min-w-[200px] bg-[#0b0f17]/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-2 flex flex-col gap-0.5 z-50">
                <Link
                  href="#services"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-500/10 transition-all"
                >
                  Web Development
                </Link>
                <Link
                  href="#services"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-500/10 transition-all"
                >
                  AI Automation
                </Link>
                <Link
                  href="#services"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-500/10 transition-all"
                >
                  SEO & GEO
                </Link>
                <div className="h-px bg-white/5 my-1" />
                <Link
                  href="#services"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-400 hover:text-purple-300 hover:bg-purple-500/15 transition-all"
                >
                  All Services
                </Link>
              </div>
            </div>

            {/* More Dropdown */}
            <div className="desktop-dropdown py-1">
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white cursor-pointer transition-colors focus:outline-none">
                More
                <ChevronDown size={14} className="dropdown-icon transition-transform duration-300 text-slate-400" />
              </button>
              
              <div className="desktop-dropdown-menu absolute top-full left-1/2 mt-3 min-w-[180px] bg-[#0b0f17]/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-2 flex flex-col gap-0.5 z-50">
                <Link
                  href="#founders"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-500/10 transition-all"
                >
                  Founders
                </Link>
                <Link
                  href="#pricing"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-500/10 transition-all"
                >
                  Pricing
                </Link>
                <Link
                  href="#reviews"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-500/10 transition-all"
                >
                  Reviews
                </Link>
              </div>
            </div>

            <Link
              href="#contact"
              className="text-sm font-medium text-slate-300 hover:text-white nav-link-underline transition-colors py-1"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/919939580371?text=Hi%2C%20I%20have%20a%20project%20idea%20can%20we%20discuss%20about%20this%20%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 border border-purple-500/30 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.2)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.45)] hover:-translate-y-0.5"
            >
              <PhoneCall size={14} />
              Get on Call
            </a>

            {status === "loading" ? (
              <div className="px-4 py-2 text-sm font-semibold text-slate-400">...</div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-inner">
                    {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                  <span className="text-sm font-medium text-white max-w-[100px] truncate hidden lg:block">
                    {session.user?.name || "User"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  />
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
                        <p className="text-xs text-slate-400 truncate">{session.user?.email || "No email"}</p>
                      </div>

                      <div className="p-2 flex flex-col gap-1">
                        {session.user?.role === "admin" && (
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 transition-colors"
                          >
                            <ShieldAlert size={16} className="text-purple-400" />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            setQueryHistoryOpen(true);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <MessageSquare size={16} className="text-purple-400" />
                          Query History
                        </button>
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
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-6 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:brightness-110 transition-all duration-300"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors p-2 z-50"
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[5.5rem] left-4 right-4 z-40 md:hidden rounded-3xl bg-[#0b0f17]/95 backdrop-blur-2xl border border-purple-500/15 shadow-[0_12px_45px_rgba(0,0,0,0.8)] overflow-hidden p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-5 mt-2">
              <Link
                href="#home"
                className="text-lg font-bold text-slate-100 hover:text-purple-400 transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {/* Collapsible Mobile Services */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between text-lg font-bold text-slate-100 hover:text-purple-400 transition-colors py-1"
                >
                  Services
                  <ChevronDown size={18} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-purple-400" : "text-slate-400"}`} />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col pl-4 border-l border-purple-500/20 mt-1 gap-2"
                    >
                      <Link
                        href="#services"
                        className="text-base text-slate-400 hover:text-white py-1.5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Web Development
                      </Link>
                      <Link
                        href="#services"
                        className="text-base text-slate-400 hover:text-white py-1.5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        AI Automation
                      </Link>
                      <Link
                        href="#services"
                        className="text-base text-slate-400 hover:text-white py-1.5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        SEO & GEO
                      </Link>
                      <Link
                        href="#services"
                        className="text-base font-semibold text-purple-400 hover:text-purple-300 py-1.5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        All Services
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collapsible Mobile More */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                  className="flex items-center justify-between text-lg font-bold text-slate-100 hover:text-purple-400 transition-colors py-1"
                >
                  More
                  <ChevronDown size={18} className={`transition-transform duration-300 ${mobileMoreOpen ? "rotate-180 text-purple-400" : "text-slate-400"}`} />
                </button>

                <AnimatePresence>
                  {mobileMoreOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col pl-4 border-l border-purple-500/20 mt-1 gap-2"
                    >
                      <Link
                        href="#founders"
                        className="text-base text-slate-400 hover:text-white py-1.5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Founders
                      </Link>
                      <Link
                        href="#pricing"
                        className="text-base text-slate-400 hover:text-white py-1.5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Pricing
                      </Link>
                      <Link
                        href="#reviews"
                        className="text-base text-slate-400 hover:text-white py-1.5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Reviews
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="#contact"
                className="text-lg font-bold text-slate-100 hover:text-purple-400 transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile CTA buttons */}
              <div className="h-px bg-white/5 my-2" />

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/919939580371?text=Hi%2C%20I%20have%20a%20project%20idea%20can%20we%20discuss%20about%20this%20%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 text-base font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all"
                >
                  <PhoneCall size={16} />
                  Get on Call
                </a>

                {status === "loading" ? (
                  <div className="py-2 text-center text-slate-400">Loading...</div>
                ) : session ? (
                  <div className="flex flex-col gap-2 bg-purple-500/5 border border-purple-500/10 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                        {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={20} />}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-bold text-white truncate">{session.user?.name || "User"}</span>
                        <span className="text-xs text-slate-400 truncate mt-0.5">{session.user?.email || "No email"}</span>
                      </div>
                    </div>

                    <div className="h-px bg-white/10 w-full my-1.5" />

                    {session.user?.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-purple-300 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
                      >
                        <ShieldAlert size={16} />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setQueryHistoryOpen(true);
                        setMobileOpen(false);
                      }}
                      className="flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-slate-300 hover:text-white rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <MessageSquare size={16} className="text-purple-400" />
                      Query History
                    </button>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                      className="flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-red-400 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthOpen(true);
                      setMobileOpen(false);
                    }}
                    className="py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(168,85,247,0.2)]"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AuthModal
        open={authOpen}
        onClose={() => {
          setAuthOpen(false);
          setAuthError("");
          setAuthMode("login");
        }}
        initialMode={authMode}
        initialError={authError}
      />

      {/* QUERY HISTORY MODAL */}
      <QueryHistoryModal open={queryHistoryOpen} onClose={() => setQueryHistoryOpen(false)} />
    </>
  );
}