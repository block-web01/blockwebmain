"use client";

import Link from "next/link";
import Image from "next/image";
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
    { label: "UI/UX Design", href: "#services" },
    { label: "Architecture", href: "#features" },
    { label: "Performance", href: "#features" },
  ],
  Company: [
    { label: "About Us", href: "#features" },
    { label: "Our Team", href: "#founders" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Support Portal", action: "support" },
    { label: "Terms of Service", action: "terms" },
    { label: "Privacy Policy", action: "privacy" },
  ],
  Social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/the-v-5s" },
    { label: "Instagram", href: "https://www.instagram.com/block_web01" },
    { label: "Twitter / X", href: "https://twitter.com/the5s_Founder" },
  ],
};

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<"terms" | "privacy">("terms");
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <footer className="relative z-[999] isolate overflow-hidden border-t border-purple-500/10">
      
      {/* Semi-transparent dark background that lets the global background grid show through gently */}
      <div className="absolute inset-0 bg-[#07040d]/90 backdrop-blur-xl" />

      {/* Dynamic top edge glow line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />

      {/* Premium top radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none 
        bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_70%)]" 
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10">
        
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative overflow-hidden rounded-full h-9 w-9">
                <Image
                  src="/logo.png"
                  alt="Block Web Logo"
                  width={36}
                  height={36}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Block Web
              </span>
            </div>
            <p className="text-sm text-[#a1a1aa] leading-relaxed font-medium">
              Designed with Intelligence.<br />
              Executed with Smartness.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 flex-1">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-sm font-semibold text-white mb-5 tracking-wide">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.action === "support" ? (
                        <button
                          onClick={() => setSupportOpen(true)}
                          className="text-sm text-[#a1a1aa] hover:text-[#a78bfa] hover:translate-x-1 transition-all duration-200 text-left cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : link.action === "terms" ? (
                        <button
                          onClick={() => { setLegalTab("terms"); setLegalOpen(true); }}
                          className="text-sm text-[#a1a1aa] hover:text-[#a78bfa] hover:translate-x-1 transition-all duration-200 text-left cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : link.action === "privacy" ? (
                        <button
                          onClick={() => { setLegalTab("privacy"); setLegalOpen(true); }}
                          className="text-sm text-[#a1a1aa] hover:text-[#a78bfa] hover:translate-x-1 transition-all duration-200 text-left cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href!}
                          target={link.href?.startsWith("http") ? "_blank" : undefined}
                          className="text-sm text-[#a1a1aa] hover:text-[#a78bfa] hover:translate-x-1 transition-all duration-200 inline-block"
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
        <div className="mt-14 border-t border-purple-500/10" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-[#71717a] font-medium">
            © {new Date().getFullYear()} Block Web. All rights reserved.
          </p>
          <p className="text-xs text-[#52525b] font-medium">
            Crafted for absolute digital excellence.
          </p>
        </div>
      </div>

      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} tab={legalTab} />
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </footer>
  );
}