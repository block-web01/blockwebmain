"use client";

import { Code, Smartphone, Palette, Layers, Zap, Briefcase } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const services = [
  {
    title: "Web Development",
    desc: "High-performance websites built with modern technologies.",
    Icon: Code,
    accent: "#8b5cf6",
    backGrad: "linear-gradient(135deg, #2d1b69, #1a0a3e)",
    frontBg: "rgba(139,92,246,0.12)",
    frontBorder: "rgba(139,92,246,0.35)",
  },
  {
    title: "App Development",
    desc: "Scalable mobile apps for Android & iOS platforms.",
    Icon: Smartphone,
    accent: "#06b6d4",
    backGrad: "linear-gradient(135deg, #0c2d36, #071420)",
    frontBg: "rgba(6,182,212,0.12)",
    frontBorder: "rgba(6,182,212,0.35)",
  },
  {
    title: "UI/UX Design",
    desc: "Clean, user-focused interfaces with modern aesthetics.",
    Icon: Palette,
    accent: "#ec4899",
    backGrad: "linear-gradient(135deg, #3d0a2a, #1a0615)",
    frontBg: "rgba(236,72,153,0.12)",
    frontBorder: "rgba(236,72,153,0.35)",
  },
  {
    title: "Architecture",
    desc: "Robust system design for scalable applications.",
    Icon: Layers,
    accent: "#10b981",
    backGrad: "linear-gradient(135deg, #0a2e1e, #051510)",
    frontBg: "rgba(16,185,129,0.12)",
    frontBorder: "rgba(16,185,129,0.35)",
  },
  {
    title: "Performance",
    desc: "Speed optimization for better user experience.",
    Icon: Zap,
    accent: "#f59e0b",
    backGrad: "linear-gradient(135deg, #2e1e0a, #150e05)",
    frontBg: "rgba(245,158,11,0.12)",
    frontBorder: "rgba(245,158,11,0.35)",
  },
  {
    title: "Consulting",
    desc: "Expert guidance to grow your digital product.",
    Icon: Briefcase,
    accent: "#a78bfa",
    backGrad: "linear-gradient(135deg, #1e1050, #0d0620)",
    frontBg: "rgba(167,139,250,0.12)",
    frontBorder: "rgba(167,139,250,0.35)",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 bg-linear-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tag */}
        <div className="flex justify-center mb-6">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.2)] rounded-full bg-[rgba(124,58,237,0.06)]">
            Services
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center tracking-tight">
          What We Do
        </h2>

        <p className="text-[#bdb7c8] text-center mt-4 mb-14 text-base max-w-2xl mx-auto">
          A wide range of digital services tailored for your needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {services.map((service, index) => {
            const { Icon } = service;
            return (
              <GlowCard
                key={index}
                glowColor="darkBlue"
                customSize
                className="group w-80 h-80"
              >
                {/* Animated panels */}
                <div className="relative flex-grow flex items-center justify-center min-h-0">

                  {/* Back panel */}
                  <div
                    className="absolute w-36 h-36 rounded-2xl -rotate-6 transition-all duration-500 ease-out group-hover:-rotate-[12deg] group-hover:scale-105"
                    style={{
                      background: service.backGrad,
                      boxShadow: `0 8px 32px ${service.accent}28`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-60"
                      style={{
                        backgroundImage: `radial-gradient(circle, ${service.accent}55 1px, transparent 1px)`,
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="absolute top-2 left-3 h-3 w-8 rounded-full bg-white/10 blur-sm" />
                  </div>

                  {/* Front panel */}
                  <div
                    className="absolute w-28 h-28 rounded-2xl flex items-center justify-center rotate-3 transition-all duration-500 ease-out group-hover:rotate-[7deg] group-hover:scale-110"
                    style={{
                      background: service.frontBg,
                      border: `1.5px solid ${service.frontBorder}`,
                      backdropFilter: "blur(12px)",
                      boxShadow: `0 4px 24px ${service.accent}30, inset 0 1px 0 rgba(255,255,255,0.07)`,
                    }}
                  >
                    <Icon
                      style={{ color: service.accent }}
                      className="h-11 w-11 drop-shadow-sm"
                      strokeWidth={1.4}
                    />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-semibold text-white">{service.title}</h3>
                  <p className="text-xs text-[#8b7fa8] mt-1 leading-relaxed">{service.desc}</p>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
