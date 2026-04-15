"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag } from "lucide-react";

export default function ProductsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#07030a]" id="products">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Content */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.2)] rounded-full bg-[rgba(124,58,237,0.06)] flex items-center justify-center gap-2 max-w-fit">
                <ShoppingBag className="w-3.5 h-3.5" />
                Our Products
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 mt-4 leading-tight">
                Explore The
                <br />
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] bg-clip-text text-transparent">
                  Block Web Ecosystem
                </span>
              </h2>
              <p className="text-[#bdb7c8] text-lg leading-relaxed mb-8 max-w-xl">
                Ready to take your operations to the next level? Our standalone products are meticulously designed to seamlessly integrate into your workflow. Check out our dedicated Products platform to discover powerful tools, components, and solutions built by our team.
              </p>
              
              <a 
                href="https://products.blockweb.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] shadow-[0_0_25px_rgba(124,58,237,0.25)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-300 max-w-fit"
              >
                Visit Products Website
                <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right: Mock Browser Window */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 order-1 lg:order-2 w-full relative"
          >
            {/* The glassy glowing border around browser */}
             <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-br from-[rgba(124,58,237,0.3)] via-[rgba(124,58,237,0.05)] to-transparent blur-[12px] opacity-50" />
            
            <div className="relative rounded-2xl border border-[rgba(124,58,237,0.2)] bg-[#0f0b12] shadow-2xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] flex flex-col aspect-[4/3]">
              {/* Browser Header */}
              <div className="flex items-center px-4 py-3 border-b border-[rgba(124,58,237,0.15)] bg-[#07030a]/50 backdrop-blur-md">
                <div className="flex gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full flex items-center justify-center gap-2 py-1.5 px-3 bg-[#1a1525] rounded border border-[rgba(124,58,237,0.1)] max-w-sm mx-auto">
                    <span className="text-[10px] text-[#bdb7c8]/60 font-medium">products.blockweb.com</span>
                  </div>
                </div>
                <div className="w-8" />
              </div>
              
              {/* Browser Content placeholder mockup */}
              <div className="flex-1 p-6 flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.1)_0%,transparent_80%)]">
                
                {/* Header Mockup */}
                <div className="flex justify-between items-center mb-8 w-full px-2">
                  <div className="h-4 w-24 rounded bg-[rgba(124,58,237,0.3)] opacity-60" />
                  <div className="flex gap-3">
                    <div className="h-2 w-8 rounded bg-[#bdb7c8]/20" />
                    <div className="h-2 w-8 rounded bg-[#bdb7c8]/20" />
                    <div className="h-2 w-8 rounded bg-[#bdb7c8]/20" />
                  </div>
                </div>
                
                {/* Hero Title Mockup */}
                <div className="flex flex-col items-center justify-center flex-1 w-full gap-4 relative z-10 px-4 text-center">
                   <div className="h-6 w-3/4 max-w-[160px] rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] opacity-90 mx-auto" />
                   <div className="h-3 w-5/6 max-w-[280px] rounded-full bg-[#bdb7c8]/30 mx-auto mt-2" />
                   <div className="h-3 w-2/3 max-w-[220px] rounded-full bg-[#bdb7c8]/30 mx-auto mb-2" />
                   
                   <div className="flex gap-4 mt-2">
                     <div className="h-8 w-24 rounded-full bg-[#8b5cf6]/80" />
                     <div className="h-8 w-24 rounded-full bg-transparent border border-[#8b5cf6]/50" />
                   </div>
                </div>

                {/* Floating Product Cards Mockup */}
                <div className="flex justify-center gap-4 mt-auto -mb-6 overflow-hidden pt-8">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="w-24 h-32 rounded-t-xl border border-[rgba(124,58,237,0.2)] bg-[#1a1525] p-3 shadow-lg flex flex-col gap-2 opacity-50 shadow-[0_-10px_20px_rgba(124,58,237,0.05)]">
                      <div className="w-full aspect-square rounded bg-[rgba(124,58,237,0.2)]" />
                      <div className="h-2 w-3/4 rounded bg-[#bdb7c8]/40 mt-1" />
                      <div className="h-2 w-1/2 rounded bg-[#bdb7c8]/20" />
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
