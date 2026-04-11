"use client";

import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "App Development", href: "#services" },
    { label: "UI/UX Development", href: "#services" },
    { label: "Architecture", href: "#features" },
    { label: "Performance", href: "#features" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Founders", href: "#founders" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#contact" },
    { label: "Privacy", href: "#" },
  ],
  Resources: [
    { label: "Help", href: "#contact" },
    { label: "Support", href: "#contact" },
    { label: "Advertise", href: "#contact" },
  ],
  Social: [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-999 isolate overflow-hidden border-t border-white/10">
      
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
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
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
            <Link href="#" className="text-sm text-white/60 hover:text-white">
              Terms and Conditions
            </Link>
            <Link href="#" className="text-sm text-white/60 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}