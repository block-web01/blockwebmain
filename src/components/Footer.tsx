"use client";

import Link from "next/link";
import { useState } from "react";
import { LegalModal } from "./LegalModal";
import { SupportModal } from "./SupportModal";

type FooterLink = {
  label: string;
  href?: string;
  action?: string;
};

const footerLinks: Record<string, FooterLink[]> = {
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "App Development", href: "#services" },
    { label: "UI/UX Development", href: "#services" },
    { label: "Architecture", href: "#features" },
    { label: "Performance", href: "#features" },
  ],
  Company: [
    { label: "About", href: "#features" },
    { label: "Founders", href: "#founders" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#contact" },
  ],
  Resources: [
    { label: "Support", action: "support" },
    { label: "Advertise", href: "#contact" },
  ],
  Social: [
    { label: "Twitter", href: "https://twitter.com/the5s_Founder" },
    { label: "Instagram", href: "https://www.instagram.com/block_web01" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/the-v-5s" },
  ],
};

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<"terms" | "privacy">("terms");
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <footer className="relative z-[999] isolate overflow-hidden border-t border-white/10">
      
      {/* ✅ HARD BACKGROUND (kills grid visually) */}
      <div className="absolute inset-0 bg-[#091413]" />

      {/* ✅ EXTRA GRID KILLER LAYER */}
      <div className="absolute inset-0 bg-[#091413] opacity-100" />

      {/* ✨ Premium glow */}
      <div className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_60%)]" 
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10">
        
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-linear-to-br from-[#8b5cf6] to-[#5b21b6] flex items-center justify-center font-black text-white text-sm shadow-[0_0_14px_rgba(139,92,246,0.45)]">
                BW
              </div>
              <span className="text-lg font-extrabold text-white">
                Block Web
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Designed with Intelligence.<br />
              Executed with Smartness.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 flex-1">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-sm font-semibold text-white mb-5">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.action === "support" ? (
                        <button
                          onClick={() => setSupportOpen(true)}
                          className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href!}
                          target={link.href?.startsWith("http") ? "_blank" : undefined}
                          className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/10" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Block Web. All rights reserved.
          </p>

          <div className="flex gap-6">
            <button onClick={() => { setLegalTab("terms"); setLegalOpen(true); }} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
              Terms and Conditions
            </button>
            <button onClick={() => { setLegalTab("privacy"); setLegalOpen(true); }} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} tab={legalTab} />
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </footer>
  );
}