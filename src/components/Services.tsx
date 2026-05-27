"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Code, Smartphone, Palette, Layers, Zap, Briefcase } from "lucide-react";

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

interface ServiceCardProps {
  service: typeof services[0];
  cardVariants: Variants;
}

function ServiceCard({ service, cardVariants }: ServiceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { Icon } = service;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Mouse position relative to the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation angles (tilt range: -10deg to 10deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    containerRef.current.style.setProperty("--rotate-x", `${rotateX}deg`);
    containerRef.current.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleMouseEnter = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    setHovered(true);
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--glow-opacity", "1");
    containerRef.current.style.setProperty("--scale", "1.02");
  };

  const handleMouseLeave = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    setHovered(false);
    if (!containerRef.current) return;
    const card = containerRef.current;
    card.style.setProperty("--glow-opacity", "0");
    card.style.setProperty("--scale", "1");
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      className="group relative p-[1.5px] rounded-[1.8rem] sm:rounded-[2.5rem] bg-white/5 overflow-hidden transition-all duration-300 ease-out"
      style={{
        transform: hovered 
          ? "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(var(--scale, 1.02), var(--scale, 1.02), var(--scale, 1.02))"
          : "none",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {/* Radial border glow */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${service.accent}, transparent 70%)`,
          opacity: "var(--glow-opacity, 0)",
          mixBlendMode: "screen"
        }}
      />

      {/* Inner Card Content */}
      <div 
        className="relative h-full rounded-[1.7rem] sm:rounded-[2.4rem] bg-[#0c0814]/90 backdrop-blur-xl p-6 sm:p-10 overflow-hidden flex flex-col justify-between"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spot light overlay inside card */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${service.bgStart}, transparent 80%)`,
            opacity: "var(--glow-opacity, 0)"
          }}
        />

        {/* Ambient Blur Blob in the corner */}
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-all duration-700 ease-in-out group-hover:scale-125"
          style={{ backgroundColor: service.blob }}
        />

        {/* Noise Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[16px_16px] pointer-events-none" />

        {/* Content Elements with 3D translation depth */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          {/* Icon Container */}
          <div 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:translate-z-[20px] group-hover:-rotate-3"
            style={{ 
              backgroundColor: service.bgStart, 
              borderColor: service.border,
              transform: "translateZ(20px)"
            }}
          >
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]" style={{ color: service.accent }} strokeWidth={1.5} />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 tracking-tight" style={{ transform: "translateZ(25px)" }}>
            {service.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-medium mb-5 sm:mb-6" style={{ transform: "translateZ(15px)" }}>
            {service.desc}
          </p>

          {/* Explore CTA link with hover slide animation */}
          <div 
            className="mt-auto flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-300"
            style={{ 
              color: service.accent,
              transform: "translateZ(20px)"
            }}
          >
            <span className="relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-current group-hover:after:w-full after:transition-all after:duration-300">
              Explore Capabilities
            </span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut"
      } 
    }
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
            We don&apos;t just build software. We craft breathtaking digital experiences, highly resilient architectures, and scalable platforms tailored for heavy user influx.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} cardVariants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
