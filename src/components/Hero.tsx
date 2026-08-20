"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";

const features = [
  "Custom UI Design",
  "Responsive Website",
  "SEO Optimized",
  "WhatsApp Integration",
  "Free SSL",
  "Free Domain & Hosting*",
  "Fast Performance",
  "Delivery in 12 Days",
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center bg-[#F8F6F2] overflow-hidden">
      {/* Decorative background grid element */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#6F42C1 0.75px, transparent 0.75px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Texts & Features */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-[#121212] mb-6">
                WE BUILD WEBSITES<br />
                <span className="text-[#6F42C1]">THAT HELP</span><br />
                BUSINESSES GROW
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="text-base sm:text-lg text-[#555555] max-w-xl mb-8 leading-relaxed"
            >
              Block Web is a high-end web development agency. We engineer custom, premium, and conversion-focused websites designed to give your business unfair leverage and turn visitors into clients.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10 w-full max-w-xl"
            >
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5.5 h-5.5 rounded-full bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1]">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-[#121212]">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-white btn-primary-gradient rounded-[14px] hover:scale-[1.03] transition-all shadow-[0_4px_20px_rgba(111,66,193,0.25)] hover:shadow-[0_6px_25px_rgba(111,66,193,0.45)] duration-300 cursor-pointer"
              >
                Get A Quote
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Mockups & Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[4/3] lg:aspect-[1.1] flex items-center justify-center">
              
              {/* Plant / Leaf Decoration in background */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="absolute -left-6 -bottom-10 w-24 h-24 text-green-700/10 z-0 pointer-events-none select-none"
              >
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full transform -rotate-12">
                  <path d="M50 0C50 0 35 30 35 60C35 90 50 100 50 100C50 100 65 90 65 60C65 30 50 0 50 0ZM50 15C52 28 58 48 58 60C58 70 54 82 50 90C46 82 42 70 42 60C42 48 48 28 50 15Z" />
                </svg>
              </motion.div>
              
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
                className="absolute -right-4 -bottom-6 w-16 h-16 text-[#F7B500]/10 z-0 pointer-events-none select-none"
              >
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full transform rotate-45">
                  <path d="M50 0C50 0 35 30 35 60C35 90 50 100 50 100C50 100 65 90 65 60C65 30 50 0 50 0ZM50 15C52 28 58 48 58 60C58 70 54 82 50 90C46 82 42 70 42 60C42 48 48 28 50 15Z" />
                </svg>
              </motion.div>

              {/* LAPTOP MOCKUP (ENTRANCE ENVELOPE) */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[90%] aspect-[16/10] z-10"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                  transition={shouldReduceMotion ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-[#1a1a1a] rounded-[18px] p-2 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#E8E8E8]/40 relative"
                >
                  <div className="relative w-full h-full bg-[#fcfbfa] rounded-[10px] overflow-hidden border border-[#222]">
                    {/* Laptop screen header */}
                    <div className="w-full h-4 sm:h-5 bg-[#E8E8E8] px-2 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                    {/* Site Preview inside screen */}
                    <div className="w-full h-[calc(100%-16px)] sm:h-[calc(100%-20px)] relative">
                      <Image
                        src="/nexcart_preview.png"
                        alt="Block Web Site Preview"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  {/* Laptop Base (Keyboard region) */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[95%] w-[106%] h-2.5 bg-[#d2d2d2] rounded-b-[4px] shadow-[0_10px_20px_rgba(0,0,0,0.06)] border-t border-white/20 z-20" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[120%] w-[24%] h-1 bg-[#b5b5b5] rounded-b-[3px] z-30" />
                </motion.div>
              </motion.div>

              {/* MOBILE MOCKUP: overlapping in bottom-left */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -45, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-2 sm:-left-6 bottom-4 w-[24%] aspect-[9/19] bg-[#1a1a1a] rounded-[24px] p-1.5 shadow-[0_25px_50px_rgba(0,0,0,0.18)] border border-[#E8E8E8]/20 z-20 hidden sm:block"
              >
                <div className="relative w-full h-full bg-[#fcfbfa] rounded-[20px] overflow-hidden border border-[#222] flex flex-col">
                  {/* Phone speaker/camera notch */}
                  <div className="w-12 h-3.5 bg-black rounded-b-[10px] mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-4 h-1 bg-white/20 rounded-full" />
                  </div>
                  {/* Phone Preview */}
                  <div className="w-full h-full relative bg-[#F8F6F2]">
                    <div className="absolute top-6 left-2 right-2 flex flex-col gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1]">
                        <Star size={10} fill="currentColor" />
                      </div>
                      <div className="h-2.5 w-[85%] bg-[#121212]/10 rounded-sm" />
                      <div className="h-2 w-[55%] bg-[#121212]/10 rounded-sm" />
                      <div className="h-10 w-full bg-white rounded-lg border border-[#E8E8E8] shadow-sm flex items-center justify-center px-1">
                        <div className="w-full h-2 bg-[#6F42C1]/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING REVIEW CARD */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-4 -bottom-6 bg-white border border-[#E8E8E8] rounded-[18px] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.06)] z-30 max-w-[200px] hidden md:block"
              >
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-[#F7B500]" fill="#F7B500" />
                  ))}
                </div>
                <p className="text-xs text-[#121212] font-semibold mb-2">
                  "Exceeded all my expectations. Shipped in 12 days!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#6F42C1] text-white flex items-center justify-center text-[10px] font-bold">
                    AK
                  </div>
                  <span className="text-[10px] font-bold text-[#555555]">Amol Kulkarni</span>
                </div>
              </motion.div>

              {/* PRICING BADGE: Top Right Floating Box */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 35, y: -25, rotate: 6 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-4 -top-6 bg-[#0D1220] rounded-[18px] p-5 shadow-[0_20px_40px_rgba(111,66,193,0.12)] border border-white/5 z-30 min-w-[170px] flex flex-col gap-1 select-none"
              >
                <span className="text-[11px] font-bold tracking-widest text-[#6F42C1] uppercase">
                  Business Website
                </span>
                <span className="text-xs text-[#555555] font-semibold mt-0.5">
                  Starting At
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-heading font-extrabold text-white">
                    $199
                  </span>
                </div>
                <div className="w-full h-px bg-white/10 my-1.5" />
                <span className="text-[9px] text-white/50 leading-tight">
                  Fixed Pricing &bull; Delivered Fast
                </span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}