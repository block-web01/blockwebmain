"use client";

import { motion } from "framer-motion";
import { Layers, Zap, Gauge } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Efficient Architecture",
    description:
      "Clean, modular codebases designed for long-term maintainability and rapid iteration.",
  },
  {
    icon: Zap,
    title: "Smart Execution",
    description:
      "Agile workflows and intelligent tooling that accelerate delivery without compromising quality.",
  },
  {
    icon: Gauge,
    title: "Performance First",
    description:
      "Every product optimized for speed, responsiveness, and seamless user experience.",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[14px] border border-[rgba(124,58,237,0.15)] bg-[#0f0b12] p-6 shadow-[0_0_60px_rgba(124,58,237,0.08)]">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                  <div className="h-3 w-3 rounded-full bg-[#eab308]" />
                  <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
                </div>
                <span className="text-xs text-[#bdb7c8]/60 font-mono">
                  project-board.tsx
                </span>
              </div>

              {/* Mock Kanban */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "To Do",
                    color: "#8b5cf6",
                    items: ["Design System", "Auth Flow"],
                  },
                  {
                    label: "In Progress",
                    color: "#eab308",
                    items: ["API Routes", "Dashboard UI"],
                  },
                  {
                    label: "Done",
                    color: "#22c55e",
                    items: ["Landing Page", "CI/CD Setup"],
                  },
                ].map((col) => (
                  <div key={col.label}>
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: col.color }}
                      />
                      <span className="text-xs font-semibold text-[#bdb7c8]">
                        {col.label}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {col.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] px-3 py-2.5"
                        >
                          <span className="text-xs text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Tasks", value: "24" },
                  { label: "Sprint", value: "97%" },
                  { label: "Velocity", value: "High" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] px-3 py-3 text-center"
                  >
                    <div className="text-lg font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[#bdb7c8]/60 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background glow */}
            <div className="absolute -inset-4 rounded-[20px] bg-gradient-to-r from-[rgba(124,58,237,0.1)] to-[rgba(76,29,149,0.05)] blur-2xl -z-10" />
          </motion.div>

          {/* Right: Feature cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.2)] rounded-full bg-[rgba(124,58,237,0.06)]">
                Why The 5
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Built Different.
                <br />
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] bg-clip-text text-transparent">
                  Built Better.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex gap-5 p-5 rounded-[14px] border border-[rgba(124,58,237,0.1)] bg-[#0f0b12]/60 hover:border-[rgba(124,58,237,0.25)] hover:bg-[#0f0b12] transition-all duration-300"
                >
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-[rgba(124,58,237,0.15)] to-[rgba(76,29,149,0.1)] border border-[rgba(124,58,237,0.15)] flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#bdb7c8] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
