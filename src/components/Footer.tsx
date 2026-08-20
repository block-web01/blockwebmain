"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LegalModal } from "./LegalModal";
import { SupportModal } from "./SupportModal";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<"terms" | "privacy">("terms");
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <footer className="relative z-[99] bg-[#0D1220] border-t border-white/5 py-16 text-white overflow-hidden">
      <div className="section-container">
        
        {/* Top footer area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 mb-4 group inline-block"
            >
              <div className="relative overflow-hidden rounded-full h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="Block Web Logo"
                  width={32}
                  height={32}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-white transition-colors group-hover:text-[#6F42C1]">
                Block Web
              </span>
            </Link>
            <p className="text-xs text-[#A0AEC0] leading-relaxed max-w-sm mb-6">
              Block Web is a premium web development agency delivering high-performance, responsive, and conversion-focused websites engineered for modern businesses.
            </p>
            <p className="text-[10px] text-white/40">
              Jaipur, Rajasthan, India &bull; Global Operations
            </p>
          </div>

          {/* Column 1: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-heading font-extrabold tracking-wider uppercase mb-5 text-[#6F42C1]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {["Home", "Services", "Portfolio", "Pricing", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = link === "Portfolio" ? "work" : link.toLowerCase();
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs text-[#A0AEC0] hover:text-[#6F42C1] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-heading font-extrabold tracking-wider uppercase mb-5 text-[#6F42C1]">
              Services
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-[#A0AEC0]">
              {[
                "Business Websites",
                "Portfolio Websites",
                "Landing Pages",
                "E-commerce Stores",
                "Web Applications",
                "UI/UX Design",
                "SEO Optimisation",
              ].map((service) => (
                <li key={service} className="hover:text-[#6F42C1] transition-colors cursor-pointer" onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company / Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-heading font-extrabold tracking-wider uppercase mb-5 text-[#6F42C1]">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <button
                  onClick={() => setSupportOpen(true)}
                  className="text-xs text-[#A0AEC0] hover:text-[#6F42C1] transition-colors text-left cursor-pointer"
                >
                  Support Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setLegalTab("terms"); setLegalOpen(true); }}
                  className="text-xs text-[#A0AEC0] hover:text-[#6F42C1] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setLegalTab("privacy"); setLegalOpen(true); }}
                  className="text-xs text-[#A0AEC0] hover:text-[#6F42C1] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li className="flex items-center gap-2 text-xs text-[#A0AEC0] mt-2 pt-2 border-t border-white/5">
                <Mail size={12} className="text-[#6F42C1]" />
                <a href="mailto:hello@blockweb.com" className="hover:text-[#6F42C1]">
                  hello@blockweb.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-[#A0AEC0]">
                <Phone size={12} className="text-[#6F42C1]" />
                <a href="https://wa.me/919939580371" className="hover:text-[#6F42C1]">
                  +91 99395 80371
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="h-px bg-white/5 w-full my-8" />

        {/* Bottom footer area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} <strong>Block Web</strong>. All rights reserved.
          </p>
          <p className="text-[10px] text-white/30 tracking-wider uppercase font-bold font-heading">
            Crafted for absolute digital excellence.
          </p>
        </div>

      </div>

      {/* MODALS */}
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} tab={legalTab} />
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </footer>
  );
}