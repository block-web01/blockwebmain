"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Headphones, Eye, ArrowUpRight } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    label: "100% Satisfaction",
  },
  {
    icon: Calendar,
    label: "Delivery in 12 Days",
  },
  {
    icon: Headphones,
    label: "Dedicated Support",
  },
  {
    icon: Eye,
    label: "Transparent Process",
  },
];

export default function BottomStrip() {
  return (
    <section className="bg-black py-8 border-t border-white/5 overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Guarantees List */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {guarantees.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 text-white/80">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#F7B500] border border-white/10">
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold font-heading tracking-wide uppercase">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Yellow CTA Button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F7B500] hover:bg-[#ffc21a] text-black font-extrabold text-sm uppercase tracking-wider rounded-[14px] shadow-[0_4px_15px_rgba(247,181,0,0.15)] hover:shadow-[0_6px_25px_rgba(247,181,0,0.35)] transition-all duration-300 cursor-pointer"
            >
              Get A Quote
              <ArrowUpRight size={16} className="stroke-[2.5]" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
