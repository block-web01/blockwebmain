"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, Layout, Server } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const categories = [
  { label: "Full Stack", color: "text-[#8b5cf6]", bg: "bg-[rgba(139,92,246,0.1)]", border: "border-[rgba(139,92,246,0.25)]" },
  { label: "Frontend", color: "text-[#06b6d4]", bg: "bg-[rgba(6,182,212,0.1)]", border: "border-[rgba(6,182,212,0.25)]" },
  { label: "Backend", color: "text-[#10b981]", bg: "bg-[rgba(16,185,129,0.1)]", border: "border-[rgba(16,185,129,0.25)]" },
  { label: "App Dev", color: "text-[#f59e0b]", bg: "bg-[rgba(245,158,11,0.1)]", border: "border-[rgba(245,158,11,0.25)]" },
  { label: "UI/UX", color: "text-[#ec4899]", bg: "bg-[rgba(236,72,153,0.1)]", border: "border-[rgba(236,72,153,0.25)]" },
];

const categoryMap: Record<string, (typeof categories)[number]> = {
  "Full Stack": categories[0],
  "Frontend": categories[1],
  "Backend": categories[2],
  "App Dev": categories[3],
  "UI/UX": categories[4],
};

const iconMap: Record<string, React.ElementType> = {
  "Full Stack": Code2,
  "Frontend": Layout,
  "Backend": Server,
  "App Dev": Smartphone,
  "UI/UX": Palette,
};

const projects = [
  {
    category: "Full Stack",
    title: "NexCart",
    description:
      "A scalable e-commerce platform with real-time inventory management, Stripe payments, and an AI-driven product recommendation engine.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    year: "2024",
  },
  {
    category: "Full Stack",
    title: "TaskFlow",
    description:
      "A collaborative project management SaaS with live updates, role-based access control, and Slack/GitHub integrations.",
    tech: ["React", "GraphQL", "Prisma", "WebSockets", "AWS"],
    year: "2024",
  },
  {
    category: "Frontend",
    title: "LunaUI",
    description:
      "A high-performance marketing site with advanced GSAP animations, 100/100 Lighthouse score, and a headless CMS integration.",
    tech: ["Next.js", "GSAP", "Tailwind CSS", "Contentful"],
    year: "2024",
  },
  {
    category: "Backend",
    title: "DataPulse API",
    description:
      "A high-throughput REST & GraphQL API serving 2M+ daily requests, featuring rate limiting, caching layers, and automated CI/CD.",
    tech: ["Express", "GraphQL", "MongoDB", "Docker", "GitHub Actions"],
    year: "2023",
  },
  {
    category: "App Dev",
    title: "FitTrack",
    description:
      "A cross-platform fitness app with AI-powered workout plans, wearable sync, and social community challenges.",
    tech: ["React Native", "Expo", "Firebase", "TensorFlow Lite"],
    year: "2024",
  },
  {
    category: "App Dev",
    title: "PaySwift",
    description:
      "A fintech mobile app enabling instant peer-to-peer transfers, multi-currency wallets, and biometric authentication.",
    tech: ["Flutter", "Dart", "Plaid API", "Firebase"],
    year: "2024",
  },
  {
    category: "UI/UX",
    title: "Aether Design System",
    description:
      "A comprehensive design system and component library for a Fortune 500 client, covering 120+ components with accessibility compliance.",
    tech: ["Figma", "Storybook", "React", "WCAG 2.1"],
    year: "2023",
  },
  {
    category: "UI/UX",
    title: "Onboard Flow",
    description:
      "A complete UX redesign of a SaaS onboarding experience, reducing user drop-off by 47% through research-driven prototyping.",
    tech: ["Figma", "Framer", "Hotjar", "User Research"],
    year: "2024",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[rgba(124,58,237,0.04)] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.2)] rounded-full bg-[rgba(124,58,237,0.06)]">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Completed Projects
          </h2>
          <p className="mt-4 text-lg text-[#bdb7c8] max-w-2xl mx-auto">
            A curated selection of what we&apos;ve built — from full-stack platforms to polished interfaces.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.label];
            return (
              <span
                key={cat.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${cat.color} ${cat.bg} ${cat.border}`}
              >
                <Icon className="h-3 w-3" />
                {cat.label}
              </span>
            );
          })}
        </motion.div>

        {/* UPDATED GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const cat = categoryMap[project.category];
            const Icon = iconMap[project.category];

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <GlowCard
                  glowColor="darkBlue"
                  customSize
                  className="w-full"
                >
                  <div className="flex flex-col gap-4 p-6">
                    <div className="flex items-start justify-between">
                      <div className={`h-11 w-11 flex items-center justify-center rounded-xl border ${cat.bg} ${cat.border}`}>
                        <Icon className={`h-5 w-5 ${cat.color}`} />
                      </div>
                      <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${cat.color} ${cat.bg} ${cat.border}`}>
                        {project.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm text-[#bdb7c8]">{project.description}</p>
                    </div>

                    <div className="h-px bg-[rgba(124,58,237,0.12)]" />

                    <div className="flex justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[10px] bg-[rgba(255,255,255,0.04)] border rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-[#6b7280]">{project.year}</span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a href="#contact" className="px-7 py-3 text-white border rounded-xl">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}