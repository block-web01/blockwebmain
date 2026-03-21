"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* ── Panel 0 – Efficient Architecture (Modular project board) ── */
function PanelArchitecture() {
  return (
    <div className="rounded-[14px] border border-[rgba(124,58,237,0.15)] bg-[#0f0b12] p-6 shadow-[0_0_60px_rgba(124,58,237,0.08)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <div className="h-3 w-3 rounded-full bg-[#eab308]" />
          <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
        </div>
        <span className="text-xs text-[#bdb7c8]/60 font-mono">project-board.tsx</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "To Do", color: "#8b5cf6", items: ["Design System", "Auth Flow"] },
          { label: "In Progress", color: "#eab308", items: ["API Routes", "Dashboard UI"] },
          { label: "Done", color: "#22c55e", items: ["Landing Page", "CI/CD Setup"] },
        ].map((col) => (
          <div key={col.label}>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full" style={{ background: col.color }} />
              <span className="text-xs font-semibold text-[#bdb7c8]">{col.label}</span>
            </div>
            <div className="space-y-2">
              {col.items.map((item) => (
                <div key={item} className="rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] px-3 py-2.5">
                  <span className="text-xs text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Tasks", value: "24" },
          { label: "Sprint", value: "97%" },
          { label: "Velocity", value: "High" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] px-3 py-3 text-center">
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-[10px] text-[#bdb7c8]/60 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Panel 1 – Smart Execution (CI/CD pipeline) ── */
function PanelExecution() {
  const stages = [
    { name: "Plan", status: "done", duration: "2m" },
    { name: "Build", status: "done", duration: "1m 12s" },
    { name: "Test", status: "running", duration: "0m 44s" },
    { name: "Deploy", status: "pending", duration: "—" },
  ];

  return (
    <div className="rounded-[14px] border border-[rgba(124,58,237,0.15)] bg-[#0f0b12] p-6 shadow-[0_0_60px_rgba(124,58,237,0.08)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <div className="h-3 w-3 rounded-full bg-[#eab308]" />
          <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
        </div>
        <span className="text-xs text-[#bdb7c8]/60 font-mono">pipeline.yml</span>
      </div>

      {/* Pipeline stages */}
      <div className="space-y-3 mb-6">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-3">
            {/* connector line */}
            <div className="flex flex-col items-center">
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${
                stage.status === "done"
                  ? "border-[#22c55e] bg-[#22c55e]/15 text-[#22c55e]"
                  : stage.status === "running"
                  ? "border-[#eab308] bg-[#eab308]/15 text-[#eab308]"
                  : "border-[rgba(124,58,237,0.25)] bg-transparent text-[#bdb7c8]/40"
              }`}>
                {stage.status === "done" ? "✓" : stage.status === "running" ? "●" : i + 1}
              </div>
              {i < stages.length - 1 && (
                <div className={`w-0.5 h-4 mt-0.5 ${
                  stage.status === "done" ? "bg-[#22c55e]/40" : "bg-[rgba(124,58,237,0.12)]"
                }`} />
              )}
            </div>
            <div className="flex-1 rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-white/80">{stage.name}</span>
              <span className={`text-[10px] font-mono ${
                stage.status === "running" ? "text-[#eab308]" :
                stage.status === "done" ? "text-[#22c55e]" : "text-[#bdb7c8]/40"
              }`}>{stage.duration}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Deploys", value: "48" },
          { label: "Coverage", value: "94%" },
          { label: "Build", value: "1.2s" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] px-3 py-3 text-center">
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-[10px] text-[#bdb7c8]/60 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Panel 2 – Performance First (Lighthouse-style metrics) ── */
function PanelPerformance() {
  const metrics = [
    { label: "Performance", score: 98, color: "#22c55e" },
    { label: "Accessibility", score: 95, color: "#22c55e" },
    { label: "Best Practices", score: 100, color: "#22c55e" },
    { label: "SEO", score: 97, color: "#22c55e" },
  ];

  const vitals = [
    { label: "FCP", value: "0.8s" },
    { label: "LCP", value: "1.2s" },
    { label: "TTI", value: "0.9s" },
    { label: "CLS", value: "0.01" },
  ];

  return (
    <div className="rounded-[14px] border border-[rgba(124,58,237,0.15)] bg-[#0f0b12] p-6 shadow-[0_0_60px_rgba(124,58,237,0.08)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <div className="h-3 w-3 rounded-full bg-[#eab308]" />
          <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
        </div>
        <span className="text-xs text-[#bdb7c8]/60 font-mono">lighthouse-report.json</span>
      </div>

      {/* Score circles */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-1.5">
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke={m.color} strokeWidth="3"
                  strokeDasharray={`${(m.score / 100) * 94.2} 94.2`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                {m.score}
              </span>
            </div>
            <span className="text-[9px] text-[#bdb7c8]/60 text-center leading-tight">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <div className="rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] p-3 mb-3">
        <p className="text-[10px] text-[#bdb7c8]/60 uppercase tracking-wider mb-2">Core Web Vitals</p>
        <div className="grid grid-cols-4 gap-2">
          {vitals.map((v) => (
            <div key={v.label} className="text-center">
              <div className="text-sm font-bold text-[#22c55e]">{v.value}</div>
              <div className="text-[9px] text-[#bdb7c8]/50">{v.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Load Time", value: "0.8s" },
          { label: "FPS", value: "60" },
          { label: "Score", value: "98/100" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-[#1a1525] border border-[rgba(124,58,237,0.08)] px-3 py-3 text-center">
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-[10px] text-[#bdb7c8]/60 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const panels = [PanelArchitecture, PanelExecution, PanelPerformance];

export default function Features() {
  const [active, setActive] = useState(0);
  const ActivePanel = panels[active];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Animated Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ActivePanel />
              </motion.div>
            </AnimatePresence>

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
                Why Block Web
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
                  onMouseEnter={() => setActive(i)}
                  className={`group flex gap-5 p-5 rounded-[14px] border cursor-default transition-all duration-300 ${
                    active === i
                      ? "border-[rgba(124,58,237,0.35)] bg-[#0f0b12] shadow-[0_0_24px_rgba(124,58,237,0.1)]"
                      : "border-[rgba(124,58,237,0.1)] bg-[#0f0b12]/60 hover:border-[rgba(124,58,237,0.25)] hover:bg-[#0f0b12]"
                  }`}
                >
                  <div className={`shrink-0 h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                    active === i
                      ? "bg-gradient-to-br from-[rgba(124,58,237,0.25)] to-[rgba(76,29,149,0.15)] border-[rgba(124,58,237,0.3)]"
                      : "bg-gradient-to-br from-[rgba(124,58,237,0.15)] to-[rgba(76,29,149,0.1)] border-[rgba(124,58,237,0.15)]"
                  }`}>
                    <feature.icon className={`h-5 w-5 transition-colors duration-300 ${active === i ? "text-[#a78bfa]" : "text-[#8b5cf6]"}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-[#bdb7c8] leading-relaxed">{feature.description}</p>
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
