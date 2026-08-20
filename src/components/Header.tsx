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
          className={`pointer-events-auto rounded-full w-full max-w-[1280px] transition-all duration-400 ease-out ${
            scrolled || mobileOpen
              ? "bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E8E8E8] shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-2.5 px-6"
              : "bg-transparent py-4 px-6"
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
              className="flex items-center gap-2 group z-50"
            >
              <div className="relative overflow-hidden rounded-full h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="Block Web Logo"
                  width={32}
                  height={32}
                  className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="font-heading font-extrabold text-lg text-[#121212] tracking-tight transition-colors group-hover:text-[#6F42C1]">
                Block Web
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-[#121212] hover:text-[#6F42C1] nav-link-underline transition-colors py-1"
              >
                Home
              </Link>
              <Link
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-[#121212] hover:text-[#6F42C1] nav-link-underline transition-colors py-1"
              >
                Services
              </Link>
              <Link
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-[#121212] hover:text-[#6F42C1] nav-link-underline transition-colors py-1"
              >
                Portfolio
              </Link>
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-[#121212] hover:text-[#6F42C1] nav-link-underline transition-colors py-1"
              >
                Pricing
              </Link>
              <Link
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-[#121212] hover:text-[#6F42C1] nav-link-underline transition-colors py-1"
              >
                About
              </Link>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-[#121212] hover:text-[#6F42C1] nav-link-underline transition-colors py-1"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white btn-primary-gradient rounded-[14px] transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_14px_rgba(111,66,193,0.25)] hover:shadow-[0_6px_20px_rgba(111,66,193,0.4)]"
              >
                Get A Quote
              </a>

              {status === "loading" ? (
                <div className="px-4 py-2 text-sm font-semibold text-slate-400">...</div>
              ) : session ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white border border-[#E8E8E8] hover:border-[#6F42C1] transition-all focus:outline-none cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6F42C1] to-[#8b5cf6] flex items-center justify-center text-white font-bold shadow-inner">
                      {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={16} />}
                    </div>
                    <span className="text-sm font-medium text-[#121212] max-w-[100px] truncate hidden lg:block">
                      {session.user?.name || "User"}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-[#555555] transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-64 bg-white border border-[#E8E8E8] rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-[100] flex flex-col"
                      >
                        <div className="p-4 border-b border-[#E8E8E8] bg-[#F8F6F2]/50 flex flex-col gap-1">
                          <p className="text-sm font-semibold text-[#121212] truncate">{session.user?.name || "User"}</p>
                          <p className="text-xs text-[#555555] truncate">{session.user?.email || "No email"}</p>
                        </div>

                        <div className="p-2 flex flex-col gap-1">
                          {session.user?.role === "admin" && (
                            <Link
                              href="/admin/dashboard"
                              onClick={() => setProfileOpen(false)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6F42C1] hover:bg-[#6F42C1]/5 transition-colors"
                            >
                              <ShieldAlert size={16} className="text-[#6F42C1]" />
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              setProfileOpen(false);
                              setQueryHistoryOpen(true);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#121212] hover:bg-[#F8F6F2] transition-colors text-left"
                          >
                            <MessageSquare size={16} className="text-[#6F42C1]" />
                            Query History
                          </button>
                          <button
                            onClick={() => {
                              setProfileOpen(false);
                              signOut();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left"
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
                  className="px-5 py-2 text-sm font-semibold text-[#121212] hover:text-[#6F42C1] rounded-full border border-[#E8E8E8] hover:border-[#6F42C1] transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#121212] hover:text-[#6F42C1] transition-colors p-2 z-50 cursor-pointer"
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[5.5rem] left-4 right-4 z-40 md:hidden rounded-2xl bg-white border border-[#E8E8E8] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 mt-2">
              <Link
                href="#home"
                className="text-base font-bold text-[#121212] hover:text-[#6F42C1] transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#services"
                className="text-base font-bold text-[#121212] hover:text-[#6F42C1] transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#work"
                className="text-base font-bold text-[#121212] hover:text-[#6F42C1] transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="#pricing"
                className="text-base font-bold text-[#121212] hover:text-[#6F42C1] transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-base font-bold text-[#121212] hover:text-[#6F42C1] transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-base font-bold text-[#121212] hover:text-[#6F42C1] transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>

              <div className="h-px bg-[#E8E8E8] my-2" />

              <div className="flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 text-base font-bold text-white btn-primary-gradient rounded-[14px] transition-all"
                >
                  Get A Quote
                </a>

                {status === "loading" ? (
                  <div className="py-2 text-center text-slate-400">Loading...</div>
                ) : session ? (
                  <div className="flex flex-col gap-2 bg-[#F8F6F2] rounded-[18px] p-4 border border-[#E8E8E8]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6F42C1] to-[#8b5cf6] flex items-center justify-center text-white font-bold">
                        {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={20} />}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-bold text-[#121212] truncate">{session.user?.name || "User"}</span>
                        <span className="text-xs text-[#555555] truncate mt-0.5">{session.user?.email || "No email"}</span>
                      </div>
                    </div>

                    <div className="h-px bg-[#E8E8E8] w-full my-1.5" />

                    {session.user?.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-[#6F42C1] rounded-[14px] border border-[#6F42C1]/20 bg-[#6F42C1]/5 hover:bg-[#6F42C1]/10 transition-all"
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
                      className="flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-[#121212] hover:text-[#6F42C1] rounded-[14px] border border-[#E8E8E8] bg-white transition-all text-left"
                    >
                      <MessageSquare size={16} className="text-[#6F42C1]" />
                      Query History
                    </button>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                      className="flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-red-500 rounded-[14px] border border-red-200 bg-red-50 transition-all"
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
                    className="py-3 text-sm font-semibold text-[#121212] hover:text-[#6F42C1] rounded-full border border-[#E8E8E8] hover:border-[#6F42C1] transition-all duration-300"
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