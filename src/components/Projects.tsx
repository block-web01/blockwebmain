"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe, Layers, Laptop, Shield } from "lucide-react";

// Categories mapping
const categories = ["All", "Web Applications", "Landing Pages", "E-commerce"];

const projects = [
  {
    title: "VishwasGirdher",
    category: "Landing Pages",
    desc: "Personal Portfolio Website",
    details: "High-performance creative portfolio with smooth transitions, modern typography, and optimized asset delivery.",
    previewType: "portfolio",
    color: "#6F42C1",
    link: "https://vishwasgirdher.com/",
  },
  {
    title: "Kabs Tech",
    category: "Web Applications",
    desc: "USA Based SaaS Company Website",
    details: "SaaS platform dashboard displaying cloud server metrics, real-time firewalls, and active API keys.",
    previewType: "saas",
    color: "#3B82F6",
    link: "https://kabstech.com/",
  },
  {
    title: "KB Global Partner",
    category: "Web Applications",
    desc: "USA Based SaaS Company Website",
    details: "Financial automation dashboard tracking multi-currency ledger reconciliations and live capital flows.",
    previewType: "finance",
    color: "#10B981",
    link: "https://kbglobalpartners.com",
  },
  {
    title: "Recell",
    category: "Web Applications",
    desc: "Lithium-ion battery recycling",
    details: "Circular economy logistics tracker documenting active battery recycling yields, environmental impacts, and global shipping nodes.",
    previewType: "eco",
    color: "#059669",
    link: "https://www.recell.in",
  },
  {
    title: "NexCart Storefront",
    category: "E-commerce",
    desc: "Modern E-commerce Platform",
    details: "Responsive online storefront displaying popular digital goods, product grid filters, and a slide-out cart sidebar.",
    previewType: "ecomm",
    color: "#F7B500",
    link: "#",
  },
  {
    title: "LunaUI Landing",
    category: "Landing Pages",
    desc: "High-performance marketing site",
    details: "Conversion-optimized product page with premium custom grids, layout systems, and clean feature columns.",
    previewType: "luna",
    color: "#EC4899",
    link: "#",
  },
];

// Helper to render responsive CSS-based website previews inside laptop screen
function RenderMockScreen({ type }: { type: string }) {
  if (type === "portfolio") {
    return (
      <div className="w-full h-full bg-[#1c1917] p-3 text-white flex flex-col justify-between font-sans">
        <div className="flex items-center justify-between border-b border-white/10 pb-1 text-[8px] opacity-70">
          <span>VISHWAS GIRDHER</span>
          <span>MENU</span>
        </div>
        <div className="my-auto flex flex-col gap-1">
          <div className="text-[12px] font-bold tracking-tight text-[#6F42C1]">CREATIVE</div>
          <div className="text-[14px] font-black leading-none">DESIGNER</div>
          <div className="text-[8px] text-[#A0AEC0] mt-1 max-w-[120px] leading-tight">Crafting premium digital experiences worldwide.</div>
        </div>
        <div className="flex justify-between items-center text-[7px] text-white/50 pt-1 border-t border-white/5">
          <span>PORTFOLIO &copy; 2026</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#6F42C1]" />
        </div>
      </div>
    );
  }
  
  if (type === "saas") {
    return (
      <div className="w-full h-full bg-[#0F172A] p-2.5 text-slate-100 flex flex-col font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[7px] text-slate-400">
          <div className="flex items-center gap-1">
            <Shield size={6} className="text-blue-400" />
            <span>KABS CLOUD</span>
          </div>
          <span>v2.4 Live</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-2.5">
          <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/50 flex flex-col gap-0.5">
            <span className="text-[5px] text-slate-400">CPU LOAD</span>
            <span className="text-[9px] font-bold text-emerald-400">14.8%</span>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/50 flex flex-col gap-0.5">
            <span className="text-[5px] text-slate-400">STORAGE</span>
            <span className="text-[9px] font-bold text-blue-400">62.1GB</span>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/50 flex flex-col gap-0.5">
            <span className="text-[5px] text-slate-400">STATUS</span>
            <span className="text-[9px] font-bold text-indigo-400">HEALTHY</span>
          </div>
        </div>
        <div className="mt-2.5 bg-slate-900 border border-slate-800 p-1.5 rounded flex-1 flex flex-col justify-between">
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-blue-500" />
          </div>
          <div className="flex items-center justify-between text-[5px] text-slate-500">
            <span>NETWORK SPEED</span>
            <span>940 Mbps</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "finance") {
    return (
      <div className="w-full h-full bg-[#FCFBF9] p-3 text-slate-800 flex flex-col justify-between font-sans">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 text-[7px] text-slate-500">
          <span className="font-bold text-[#10B981]">KB GLOBAL</span>
          <span>Active Ledger</span>
        </div>
        <div className="my-auto flex flex-col gap-1.5">
          <span className="text-[7px] text-slate-400 uppercase tracking-wider font-semibold">Net Balance</span>
          <span className="text-[15px] font-bold tracking-tight text-slate-950">$84,920.00</span>
          <div className="flex gap-2">
            <span className="text-[6px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">+14.2%</span>
            <span className="text-[6px] text-slate-400 flex items-center">vs last month</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[6px] text-slate-400 pt-1 border-t border-slate-100">
          <span>SECURE RECONCILIATION</span>
          <span className="text-[#10B981] font-bold">● ONLINE</span>
        </div>
      </div>
    );
  }

  if (type === "eco") {
    return (
      <div className="w-full h-full bg-[#052e16] p-3 text-emerald-100 flex flex-col justify-between font-sans">
        <div className="flex items-center justify-between border-b border-emerald-900 pb-1 text-[7px] text-emerald-400">
          <span>RECELL RECYCLING</span>
          <span>Logistics Node</span>
        </div>
        <div className="my-auto flex flex-col gap-1">
          <div className="text-[9px] font-bold text-emerald-300">Sustainability Index</div>
          <div className="text-[15px] font-black tracking-tight text-white leading-none">98.4 AQI</div>
          <div className="h-1.5 w-full bg-emerald-950 rounded-full mt-1.5 overflow-hidden">
            <div className="h-full w-[90%] bg-emerald-400" />
          </div>
        </div>
        <div className="flex justify-between items-center text-[6px] text-emerald-500 pt-1 border-t border-emerald-900">
          <span>CO2 OFFSET: 24,192 Tons</span>
          <span>IN &bull; US &bull; UK</span>
        </div>
      </div>
    );
  }

  if (type === "ecomm") {
    return (
      <div className="w-full h-full bg-white p-2.5 text-slate-800 flex flex-col justify-between font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1 text-[7px] text-slate-600">
          <span className="font-bold">NEXSTORE</span>
          <span>Cart (2)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-auto">
          <div className="border border-slate-100 rounded-lg p-1 flex flex-col gap-1 shadow-sm">
            <div className="w-full aspect-square bg-slate-100 rounded" />
            <div className="h-1.5 w-[70%] bg-slate-800/80 rounded" />
            <div className="h-1 w-[40%] bg-slate-400 rounded" />
          </div>
          <div className="border border-slate-100 rounded-lg p-1 flex flex-col gap-1 shadow-sm">
            <div className="w-full aspect-square bg-slate-100 rounded" />
            <div className="h-1.5 w-[75%] bg-slate-800/80 rounded" />
            <div className="h-1 w-[50%] bg-slate-400 rounded" />
          </div>
        </div>
        <div className="w-full h-3 bg-[#6F42C1] rounded text-[6px] font-bold text-white flex items-center justify-center">
          Checkout Now
        </div>
      </div>
    );
  }

  // Fallback (Luna Landing UI mockup)
  return (
    <div className="w-full h-full bg-slate-50 p-3 text-slate-800 flex flex-col justify-between font-sans">
      <div className="flex items-center justify-between border-b border-slate-200 pb-1 text-[7px] text-slate-600">
        <span className="font-bold tracking-tight text-pink-600">LUNA.UI</span>
        <span>Components</span>
      </div>
      <div className="my-auto flex flex-col gap-1.5">
        <div className="text-[11px] font-extrabold text-slate-900 leading-none">Designed to Convert.</div>
        <div className="flex gap-1.5">
          <div className="h-2 w-7 bg-pink-500 rounded-sm" />
          <div className="h-2 w-7 bg-slate-200 rounded-sm" />
        </div>
        <div className="grid grid-cols-2 gap-1 mt-1">
          <div className="h-4 bg-white border border-slate-100 rounded shadow-sm" />
          <div className="h-4 bg-white border border-slate-100 rounded shadow-sm" />
        </div>
      </div>
      <div className="text-[6px] text-slate-400">100% Core Web Vital compliance.</div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projects.filter(
    (proj) => activeCategory === "All" || proj.category === activeCategory
  );

  return (
    <section id="work" className="relative py-24 bg-[#F8F6F2]">
      <div className="section-container">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="block mb-3 text-xs font-extrabold uppercase tracking-widest text-[#6F42C1] font-heading"
            >
              The Receipts
            </motion.span>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121212]"
            >
              Featured Work
            </motion.h2>
          </div>

          {/* Filtering Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold rounded-full border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#6F42C1] text-white border-[#6F42C1] shadow-[0_4px_14px_rgba(111,66,193,0.25)]"
                    : "bg-white text-[#121212] border-[#E8E8E8] hover:border-[#6F42C1] hover:text-[#6F42C1]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.title}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* LAPTOP SCREEN MOCKUP */}
                  <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-[18px] p-2.5 sm:p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.04)] border border-[#E8E8E8] overflow-hidden mb-6 z-10">
                    
                    {/* Screen Outer frame */}
                    <div className="relative w-full h-full bg-[#fcfbfa] rounded-[10px] overflow-hidden border border-[#222]">
                      
                      {/* Browser header bar */}
                      <div className="w-full h-4 sm:h-5 bg-[#E8E8E8] px-2 flex items-center gap-1 border-b border-[#dcdcdc] select-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <div className="h-2.5 w-24 bg-white rounded-sm mx-auto flex items-center justify-center text-[5px] text-slate-400">
                          {project.title.toLowerCase()}.com
                        </div>
                      </div>

                      {/* Mock Screen Content (Zooming component) */}
                      <div className="w-full h-[calc(100%-16px)] sm:h-[calc(100%-20px)] relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.04]">
                        <RenderMockScreen type={project.previewType} />
                      </div>
                    </div>

                    {/* Laptop Bottom Lid Edge */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[90%] w-[105%] h-2.5 bg-[#d2d2d2] rounded-b-[4px] border-t border-white/20 z-20" />
                  </div>

                  {/* Description Info */}
                  <span className="text-[11px] font-bold text-[#6F42C1] uppercase tracking-widest block mb-2">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center gap-2 group-hover:text-[#6F42C1] transition-colors mb-2">
                    <h3 className="text-xl font-heading font-extrabold text-[#121212] tracking-tight">
                      {project.title}
                    </h3>
                    <ArrowUpRight size={16} className="text-[#555555] group-hover:text-[#6F42C1] transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  
                  <p className="text-xs text-[#555555] font-bold mb-3 italic">
                    {project.desc}
                  </p>
                  
                  <p className="text-sm text-[#555555] leading-relaxed mb-6">
                    {project.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}