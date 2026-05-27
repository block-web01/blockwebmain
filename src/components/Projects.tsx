"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Smartphone, Palette, Layout, Server, ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const categories = [
  { label: "AaaS", color: "text-[#10b981]", bg: "bg-[rgba(16,185,129,0.08)]", border: "border-[rgba(16,185,129,0.15)]", shadow: "shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]" },
  { label: "Web Dev", color: "text-[#06b6d4]", bg: "bg-[rgba(6,182,212,0.08)]", border: "border-[rgba(6,182,212,0.15)]", shadow: "shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]" },
  { label: "SaaS", color: "text-[#8b5cf6]", bg: "bg-[rgba(139,92,246,0.08)]", border: "border-[rgba(139,92,246,0.15)]", shadow: "shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)]" },
  { label: "AEO/GEO", color: "text-[#ec4899]", bg: "bg-[rgba(236,72,153,0.08)]", border: "border-[rgba(236,72,153,0.15)]", shadow: "shadow-[0_0_50px_-12px_rgba(236,72,153,0.3)]" },
  { label: "AI Automation", color: "text-[#f59e0b]", bg: "bg-[rgba(245,158,11,0.08)]", border: "border-[rgba(245,158,11,0.15)]", shadow: "shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)]" },
];

const categoryMap: Record<string, (typeof categories)[number]> = {
  "AaaS": categories[0],
  "Web Dev": categories[1],
  "SaaS": categories[2],
  "AEO/GEO": categories[3],
  "AI Automation": categories[4],
};

const iconMap: Record<string, React.ElementType> = {
  "AaaS": Server,
  "Web Dev": Layout,
  "SaaS": Code2,
  "AEO/GEO": Palette,
  "AI Automation": Smartphone,
};

const projects = [
  {
    category: "SaaS",
    title: "NexCart",
    description:
      "A scalable e-commerce platform with real-time inventory management, Stripe payments, and an AI-driven product recommendation engine.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    year: "2024",
    type: "nexcart"
  },
  {
    category: "SaaS",
    title: "TaskFlow",
    description:
      "A collaborative project management SaaS with live updates, role-based access control, and Slack/GitHub integrations.",
    tech: ["React", "GraphQL", "Prisma", "WebSockets", "AWS"],
    year: "2024",
    type: "taskflow"
  },
  {
    category: "Web Dev",
    title: "LunaUI",
    description:
      "A high-performance marketing site with advanced GSAP animations, 100/100 Lighthouse score, and a headless CMS integration.",
    tech: ["Next.js", "GSAP", "Tailwind CSS", "Contentful"],
    year: "2024",
    type: "lunaui"
  },
  {
    category: "AaaS",
    title: "DataPulse API",
    description:
      "A high-throughput REST & GraphQL API serving 2M+ daily requests, featuring rate limiting, caching layers, and automated CI/CD.",
    tech: ["Express", "GraphQL", "MongoDB", "Docker", "GitHub Actions"],
    year: "2023",
    type: "datapulse"
  },
  {
    category: "AI Automation",
    title: "FitTrack",
    description:
      "A cross-platform fitness app with AI-powered workout plans, wearable sync, and social community challenges.",
    tech: ["React Native", "Expo", "Firebase", "TensorFlow Lite"],
    year: "2024",
    type: "fittrack"
  },
  {
    category: "AI Automation",
    title: "PaySwift",
    description:
      "A fintech mobile app enabling instant peer-to-peer transfers, multi-currency wallets, and biometric authentication.",
    tech: ["Flutter", "Dart", "Plaid API", "Firebase"],
    year: "2024",
    type: "payswift"
  },
  {
    category: "Web Dev",
    title: "Aether Design System",
    description:
      "A comprehensive design system and component library for a Fortune 500 client, covering 120+ components with accessibility compliance.",
    tech: ["Figma", "Storybook", "React", "WCAG 2.1"],
    year: "2023",
    type: "aether"
  },
  {
    category: "AEO/GEO",
    title: "Onboard Flow",
    description:
      "An analytics dashboard designed for Generative Engine Optimization, tracking Perplexity/ChatGPT citations and optimizing AI-search visibility.",
    tech: ["Figma", "Framer", "Hotjar", "User Research"],
    year: "2024",
    type: "onboard"
  },
];

/* ── MOCKUP SCREENS FOR EACH PROJECT (Apple Slide Style) ── */

function NexCartMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-white/5 bg-[#07040a] shadow-lg flex items-center justify-center select-none pointer-events-none">
      <img src="/nexcart_preview.png" alt="NexCart Mockup" className="w-full h-full object-cover opacity-90" />
    </div>
  );
}

function TaskFlowMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl border border-white/5 bg-[#0f0b12] p-4 flex flex-col justify-between font-mono text-[10px] select-none pointer-events-none">
      <div className="flex items-center justify-between text-white/40 border-b border-white/5 pb-2 mb-2">
        <span>taskflow-kanban.json</span>
        <span className="text-purple-400">● Live Updates</span>
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        <div className="bg-[#16121d] rounded-lg p-2.5 border border-white/5">
          <span className="text-[#a78bfa] block font-bold mb-1.5">Sprint Tasks</span>
          <div className="space-y-1.5">
            <div className="bg-[#1f1929] rounded p-1.5 text-white/80">API Webhooks</div>
            <div className="bg-[#1f1929] rounded p-1.5 text-white/80">CI/CD Deploy</div>
          </div>
        </div>
        <div className="bg-[#16121d] rounded-lg p-2.5 border border-white/5">
          <span className="text-[#10b981] block font-bold mb-1.5">Completed</span>
          <div className="space-y-1.5 opacity-60">
            <div className="bg-[#1f1929] rounded p-1.5 text-white/80 line-through">Auth System</div>
            <div className="bg-[#1f1929] rounded p-1.5 text-white/80 line-through">Slack Integration</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LunaUIMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl border border-white/5 bg-[#0f0b12] p-4 flex flex-col justify-between font-mono select-none pointer-events-none">
      <div className="flex justify-between items-center text-[10px] text-white/40">
        <span>lunaui-lighthouse.yaml</span>
        <span className="text-cyan-400">✓ 100/100 Score</span>
      </div>
      <div className="flex justify-around items-center flex-1 my-2">
        {[
          { l: "Perf", v: 100 },
          { l: "Acc", v: 100 },
          { l: "SEO", v: 100 }
        ].map(m => (
          <div key={m.l} className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full border-2 border-cyan-500/20 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              {m.v}
            </div>
            <span className="text-[9px] text-[#bdb7c8]">{m.l}</span>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-white/50 text-center">GSAP Core Animations Active</div>
    </div>
  );
}

function DataPulseMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl border border-white/5 bg-[#0f0b12] p-4 flex flex-col justify-between font-mono text-[9px] text-white/60 select-none pointer-events-none">
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 text-white/40">
        <span>datapulse-query.graphql</span>
        <span className="text-emerald-400">2M+ reqs/day</span>
      </div>
      <pre className="text-emerald-400 leading-normal flex-1">
{`query GetAnalytics {
  pulseAPI {
    throughput: "24.5k/s"
    latency: "12ms"
    caching: "98.4% Hit"
  }
}`}
      </pre>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden w-full mt-2">
        <div className="h-full bg-emerald-500 w-[94%]" />
      </div>
    </div>
  );
}

function FitTrackMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl border border-white/5 bg-[#0f0b12] p-4 flex flex-col justify-between font-mono text-[10px] select-none pointer-events-none">
      <div className="flex justify-between items-center text-white/40">
        <span>fittrack-stats.swift</span>
        <span className="text-amber-400">Wearable Synced</span>
      </div>
      <div className="flex items-center justify-center gap-4 flex-1 my-2">
        <div className="relative h-16 w-16 flex items-center justify-center">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="3" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="75 100" strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center text-[10px] text-white font-bold">
            <span>8,420</span>
            <span className="text-[6px] text-white/60 uppercase">Steps</span>
          </span>
        </div>
        <div className="space-y-1 text-white/80">
          <div>🔥 340 kCal burnt</div>
          <div>⏱ 45 mins active</div>
        </div>
      </div>
    </div>
  );
}

function PaySwiftMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl border border-white/5 bg-[#0f0b12] p-4 flex items-center justify-center select-none pointer-events-none">
      <div className="w-[200px] h-[120px] rounded-xl bg-gradient-to-tr from-[#ec4899]/30 via-[#8b5cf6]/20 to-[#06b6d4]/30 border border-white/10 p-3 flex flex-col justify-between text-white font-sans shadow-lg shadow-purple-500/10">
        <div className="flex justify-between items-start">
          <div className="text-[10px] font-bold tracking-widest text-white/60">PAYSWIFT</div>
          <div className="h-4 w-6 bg-white/20 rounded" />
        </div>
        <div>
          <div className="text-[8px] text-white/50 tracking-wider">BALANCE</div>
          <div className="text-sm font-bold tracking-tight">$12,450.00</div>
        </div>
        <div className="flex justify-between text-[7px] text-white/40">
          <span>KRISHNA SINGH</span>
          <span>12/28</span>
        </div>
      </div>
    </div>
  );
}

function AetherMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl border border-white/5 bg-[#0f0b12] p-4 flex flex-col justify-between font-mono text-[10px]">
      <div className="flex justify-between items-center text-white/40">
        <span>aether-components.tsx</span>
        <span className="text-pink-400">120+ Components</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 items-center justify-center">
        <div className="flex gap-2">
          <button type="button" className="px-3 py-1.5 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-300 font-bold select-none cursor-pointer">Button Primary</button>
          <button type="button" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 select-none cursor-pointer">Secondary</button>
        </div>
        <div className="flex items-center gap-2 w-[180px]">
          <span className="text-[8px] text-white/40">Slider</span>
          <div className="h-1 bg-white/10 rounded-full flex-1 overflow-hidden">
            <div className="h-full bg-pink-500 w-[60%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardMockup() {
  return (
    <div className="relative w-full h-[220px] rounded-xl border border-white/5 bg-[#0f0b12] p-4 flex flex-col justify-between font-mono text-[10px] select-none pointer-events-none">
      <div className="flex justify-between items-center text-white/40">
        <span>onboard-flowchart.mermaid</span>
        <span className="text-purple-400">UX Redesign</span>
      </div>
      <div className="flex items-center justify-center gap-2 flex-1">
        <div className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-white/80">Signup</div>
        <div className="text-purple-500">→</div>
        <div className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-white/80">Tutorial</div>
        <div className="text-purple-500">→</div>
        <div className="px-2 py-1 rounded bg-[#10b981]/20 border border-[#10b981]/40 text-white font-bold">Active User</div>
      </div>
      <div className="text-[9px] text-[#22c55e] text-center font-bold">✓ Drop-off reduced by 47%</div>
    </div>
  );
}

const mockups: Record<string, React.ElementType> = {
  nexcart: NexCartMockup,
  taskflow: TaskFlowMockup,
  lunaui: LunaUIMockup,
  datapulse: DataPulseMockup,
  fittrack: FitTrackMockup,
  payswift: PaySwiftMockup,
  aether: AetherMockup,
  onboard: OnboardMockup
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("SaaS");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);

  const categoryProjects = projects.filter((p) => p.category === activeCategory);
  const activeProject = categoryProjects[selectedProjectIndex] || categoryProjects[0] || projects[0];
  const activeCat = categoryMap[activeCategory] || categoryMap["SaaS"];
  const ActiveIcon = iconMap[activeCategory] || iconMap["SaaS"];
  const ActiveMockup = mockups[activeProject.type] || NexCartMockup;

  const handleCategoryHover = (catLabel: string) => {
    setActiveCategory(catLabel);
    setSelectedProjectIndex(0);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden bg-[#050209]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07030a] via-[#0a0610] to-[#07030a] opacity-40 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#8b5cf6]" />
            <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#8b5cf6] border border-purple-500/20 rounded-full bg-purple-500/5 backdrop-blur-md">
              Our Work
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#8b5cf6]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Completed Projects
          </h2>
          <p className="mt-4 text-sm font-light tracking-[0.25em] text-[#bdb7c8]/80 mb-8 lowercase text-center">
            we complete your business
          </p>
        </div>

        {/* Horizontal Category Selector (Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-4xl mx-auto select-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    handleCategoryHover(cat.label);
                  }
                }}
                onClick={() => handleCategoryHover(cat.label)}
                className={`px-6 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-[#8b5cf6] text-white bg-purple-500/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                    : "border-white/10 text-slate-400 bg-[#0c0814]/40 hover:border-purple-500/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Full-width Keynote Detail Card */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="group relative h-full transition-all duration-500">
            {/* No ambient outer glows or shadows to keep visual focus clean */}
            <GlowCard
              glowColor={
                activeCategory === "SaaS" ? "purple" :
                activeCategory === "Web Dev" ? "blue" :
                activeCategory === "AaaS" ? "green" :
                activeCategory === "AEO/GEO" ? "red" : "orange"
              }
              customSize
              className="w-full relative transition-all duration-300 group-hover:border-[rgba(255,255,255,0.1)] p-0"
            >
              {/* Permanent category border that brightens on hover */}
              <div className={`absolute inset-0 rounded-2xl border ${activeCat.border} opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none z-20`} />

              <div className="flex flex-col md:flex-row items-stretch justify-between h-full w-full min-h-[400px] overflow-hidden">
                
                {/* Details Panel (Left Inside Card) - STABLE LAYOUT */}
                <div className="flex flex-col justify-between p-8 sm:p-10 flex-1 z-10 w-full md:w-[52%]">
                  <div>
                    {/* Top layout - STABLE */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-2.5 py-0.5 text-[9px] font-bold tracking-wider rounded border ${activeCat.color} ${activeCat.bg} ${activeCat.border}`}>
                        {activeProject.category.toUpperCase()}
                      </span>
                      <ActiveIcon className={`h-5 w-5 ${activeCat.color}`} strokeWidth={1.8} />
                    </div>

                    {/* If category has multiple projects, show a sub-navigator inside the card - STABLE */}
                    {categoryProjects.length > 1 && (
                      <div className="flex gap-1.5 mb-6 p-1 bg-white/5 border border-white/5 rounded-xl max-w-fit relative z-30">
                        {categoryProjects.map((p, idx) => {
                          const isSubActive = selectedProjectIndex === idx;
                          return (
                            <button
                              key={p.title}
                              onClick={() => setSelectedProjectIndex(idx)}
                              onMouseEnter={() => {
                                if (window.matchMedia("(hover: hover)").matches) {
                                  setSelectedProjectIndex(idx);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                                isSubActive
                                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/10"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              {p.title}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* ANIMATED AREA: Title & Description */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeCategory}-${selectedProjectIndex}-text`}
                        initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <h3 className="text-3xl font-black text-white tracking-tight leading-tight">
                          {activeProject.title}
                        </h3>
                        <p className="mt-4 text-sm text-[#bdb7c8] leading-relaxed max-w-md">
                          {activeProject.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-8 space-y-4">
                    <div className="h-px bg-white/5 w-full" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeCategory}-${selectedProjectIndex}-tech`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-between items-center w-full gap-4"
                      >
                        <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                          {activeProject.tech.map((t) => (
                            <span key={t} className="px-2 py-0.5 text-[9px] bg-white/5 border border-white/5 rounded text-[#8e8e93] group-hover:text-white group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{activeProject.year}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Live Visual Widget Mockup Panel (Right Inside Card) - ANIMATED IN-PLACE */}
                <div className="relative w-full md:w-[48%] bg-[#08050e] border-l border-t md:border-t-0 border-white/5 p-6 flex items-center justify-center min-h-[280px] md:min-h-0 overflow-hidden">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCategory}-${selectedProjectIndex}-mockup`}
                      initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex items-center justify-center z-10"
                    >
                      <ActiveMockup />
                    </motion.div>
                  </AnimatePresence>

                  {/* Sparkly category ambient spot glow inside widget panel */}
                  <div className={`absolute -inset-4 rounded-r-2xl bg-[radial-gradient(circle_at_center,${activeCat.bg}_0%,transparent_70%)] opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10 pointer-events-none`} />
                </div>

              </div>

            </GlowCard>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 border border-purple-500/30 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.15)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 group"
          >
            Start Your Project
            <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}