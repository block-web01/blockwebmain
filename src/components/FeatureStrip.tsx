"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, Zap, Search, MessageSquare, Target } from "lucide-react";

const features = [
  {
    icon: MonitorSmartphone,
    title: "Responsive",
    desc: "Seamlessly runs across mobile, tablet, and desktop viewports.",
  },
  {
    icon: Zap,
    title: "Fast Loading",
    desc: "Optimized for lightning-fast speeds and high Core Web Vitals.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    desc: "Built with indexable semantic code and modern SEO best practices.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    desc: "Direct integration to connect with your leads in a click.",
  },
  {
    icon: Target,
    title: "Lead Focused",
    desc: "Conversion-optimized funnels designed to scale revenue.",
  },
];

export default function FeatureStrip() {
  return (
    <section className="relative bg-[#0D1220] py-16 overflow-hidden border-y border-white/5">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                className={`flex flex-col items-center lg:items-start text-center lg:text-left ${
                  idx > 0 ? "pt-6 lg:pt-0 lg:pl-8" : "lg:pl-2"
                }`}
              >
                {/* Icon wrapper */}
                <div className="mb-4 w-10 h-10 rounded-full bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] border border-[#6F42C1]/20">
                  <IconComponent size={18} className="stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#A0AEC0] leading-relaxed max-w-[220px]">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
