"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Code, Smartphone, Palette, Layers, Zap, Briefcase, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Web Development",
    desc: "High-performance websites built with modern frameworks and resilient serverless architectures.",
    Icon: Code,
    accent: "#8b5cf6", 
    bgStart: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
    blob: "rgba(139,92,246,0.5)",
  },
  {
    title: "App Development",
    desc: "Scalable mobile applications engineered for flawless Android & iOS native experiences.",
    Icon: Smartphone,
    accent: "#06b6d4",
    bgStart: "rgba(6,182,212,0.1)",
    border: "rgba(6,182,212,0.2)",
    blob: "rgba(6,182,212,0.5)",
  },
  {
    title: "UI/UX Design",
    desc: "Immersive, user-focused interfaces with breathtaking modern glassmorphic aesthetics.",
    Icon: Palette,
    accent: "#ec4899",
    bgStart: "rgba(236,72,153,0.1)",
    border: "rgba(236,72,153,0.2)",
    blob: "rgba(236,72,153,0.5)",
  },
  {
    title: "Architecture",
    desc: "Robust, fault-tolerant system designs built exclusively for globally scalable applications.",
    Icon: Layers,
    accent: "#10b981",
    bgStart: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.2)",
    blob: "rgba(16,185,129,0.5)",
  },
  {
    title: "Performance",
    desc: "Extreme global speed optimization scaling down edge load times to absolute milliseconds.",
    Icon: Zap,
    accent: "#f59e0b",
    bgStart: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    blob: "rgba(245,158,11,0.5)",
  },
  {
    title: "Consulting",
    desc: "Expert technical guidance and architectural strategy to rapidly grow your digital product.",
    Icon: Briefcase,
    accent: "#a78bfa",
    bgStart: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)",
    blob: "rgba(167,139,250,0.5)",
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden bg-[#050209]">
      {/* Absolute Ambient Backgrounds */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a78bfa] border border-purple-500/20 rounded-full bg-purple-500/5 backdrop-blur-md">
              Our Capabilities
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-500" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white text-center tracking-tight leading-[1.1]"
          >
            Engineered for <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#06b6d4]">
              Absolute Excellence
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#9ca3af] text-center mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We don't just build software. We craft breathtaking digital experiences, highly resilient architectures, and scalable platforms tailored for heavy user influx.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const { Icon } = service;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative h-full rounded-[2.5rem] bg-[#0c0814] border border-white/5 overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-2xl"
              >
                {/* Dynamic Border Gradient injected on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] p-[1.5px]"
                  style={{ background: `linear-gradient(135deg, ${service.border}, transparent, ${service.border})` }}
                >
                  <div className="absolute inset-0 bg-[#0c0814] rounded-[2.5rem]" />
                </div>

                {/* Animated Blur Blob beneath Icon container */}
                <div 
                  className="absolute top-10 right-10 w-40 h-40 rounded-full blur-[70px] opacity-20 group-hover:opacity-60 transition-all duration-700 ease-in-out group-hover:scale-150"
                  style={{ backgroundColor: service.blob }}
                />

                {/* Noise Grid overlay inside card */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[12px_12px] opacity-30" />

                {/* Main Card Content */}
                <div className="relative z-10 flex flex-col p-8 sm:p-10 h-full justify-between">
                  <div>
                    {/* Icon Container */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border backdrop-blur-xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                      style={{ backgroundColor: service.bgStart, borderColor: service.border }}
                    >
                      <Icon className="w-8 h-8 drop-shadow-md" style={{ color: service.accent }} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#a1a1aa] leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>

                  {/* Learn more interactable base */}
                  <div className="mt-10 overflow-hidden flex items-center">
                    <button 
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                      style={{ color: service.accent }}
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">Explore</span>
                      <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </button>
                    {/* Ghost bar */}
                    <div className="ml-4 h-[1px] flex-1 bg-white/5 group-hover:bg-gradient-to-r transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, ${service.border}, transparent)` }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
