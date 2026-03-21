"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Layers, Code2, Palette, Zap } from "lucide-react";
import { useState } from "react";

const founders = [
  {
    name: "Aditya Srivastva",
    role: "Co-Founder",
    tagline: "Engineering precision into every line of code.",
    expertise: "Full Stack Engineering",
    focus: ["Next.js", "System Architecture", "Performance"],
    bio: "Aditya drives the technical backbone of The 5. With a sharp eye for scalable architecture and clean code, he turns complex problems into elegant digital solutions.",
    icon: Code2,
    avatarGrad: "from-[#6d28d9] via-[#7c3aed] to-[#4c1d95]",
    accentColor: "#8b5cf6",
  },
  {
    name: "Gurmit Singh",
    role: "Co-Founder",
    tagline: "Transforming ideas into high-impact products.",
    expertise: "Product Strategy & Growth",
    focus: ["Design Systems", "Prototyping", "User Research"],
    bio: "Gurmit is the engine of execution. He translates bold ideas into real-world products with relentless drive, ensuring every project ships with maximum impact and clarity.",
    icon: Zap,
    avatarGrad: "from-[#4c1d95] via-[#7c3aed] to-[#6d28d9]",
    accentColor: "#c4b5fd",
  },
  {
    name: "Krishna Sharma",
    role: "Co-Founder",
    tagline: "Architecting scalable systems for the future.",
    expertise: "Backend & Infrastructure",
    focus: ["Cloud Systems", "APIs", "DevOps"],
    bio: "Krishna builds the invisible pillars that keep everything running — from robust backend systems to scalable cloud infrastructure that never breaks under pressure.",
    icon: Layers,
    avatarGrad: "from-[#5b21b6] via-[#6d28d9] to-[#3b0764]",
    accentColor: "#7c3aed",
  },
  {
    name: "Gabbar Sharma",
    role: "Co-Founder",
    tagline: "Driving innovation through intelligent design.",
    expertise: "UI/UX & Product Design",
    focus: ["Vision", "Client Relations", "Execution"],
    bio: "Gabbar bridges the gap between logic and beauty. His design philosophy is rooted in intelligence — creating interfaces that feel intuitive before the user even thinks.",
    icon: Palette,
    avatarGrad: "from-[#7c3aed] via-[#8b5cf6] to-[#5b21b6]",
    accentColor: "#a78bfa",
  },
];

type Founder = (typeof founders)[0];

function ModernAvatar({ founder, size = "lg" }: { founder: Founder; size?: "lg" | "xl" }) {
  const Icon = founder.icon;
  const dim = size === "xl" ? "h-20 w-20" : "h-16 w-16";
  const iconSize = size === "xl" ? "h-9 w-9" : "h-7 w-7";
  return (
    <div className={`relative ${dim} rounded-2xl bg-gradient-to-br ${founder.avatarGrad} flex items-center justify-center shadow-lg`}>
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="absolute top-1 left-2 h-3 w-6 rounded-full bg-white/20 blur-sm" />
      <Icon className={`${iconSize} text-white/90 drop-shadow-sm`} strokeWidth={1.6} />
    </div>
  );
}

function FlipCard({ founder, index }: { founder: Founder; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-[320px]"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-[14px] border border-[rgba(124,58,237,0.12)] bg-[#0f0b12] p-7 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Hover glow overlay — always visible via JS hover */}
          <div
            className="absolute inset-0 rounded-[14px] transition-opacity duration-300 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(10,37,64,0.5) 0%, transparent 100%)",
              opacity: flipped ? 1 : 0,
            }}
          />
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-5">
              <ModernAvatar founder={founder} size="lg" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white">{founder.name}</h3>
              <BadgeCheck className="h-4 w-4 text-[#8b5cf6] flex-shrink-0" />
            </div>
            <p className="text-sm font-medium text-[#8b5cf6] mb-3">{founder.role}</p>
            <p className="text-sm text-[#bdb7c8] leading-relaxed">{founder.tagline}</p>
            <p className="mt-auto pt-4 text-[11px] text-[#6d5e85] uppercase tracking-widest font-medium">
              Hover to see more
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-[18px] overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, rgba(10,37,64,0.72) 0%, rgba(15,11,18,0.92) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid rgba(139,92,246,0.28)`,
            boxShadow: "0 8px 48px rgba(124,58,237,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* top accent bar */}
          <div
            className="h-[3px] w-full flex-shrink-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${founder.accentColor}, transparent)`,
            }}
          />

          <div className="p-6 flex flex-col flex-1 overflow-hidden">
            {/* avatar + name */}
            <div className="flex items-center gap-3 mb-4">
              <ModernAvatar founder={founder} size="lg" />
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="text-base font-bold text-[#C7DDEB]">{founder.name}</h3>
                  <BadgeCheck className="h-4 w-4 flex-shrink-0" style={{ color: founder.accentColor }} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: founder.accentColor }}>
                  {founder.role}
                </p>
              </div>
            </div>

            {/* expertise badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-3 self-start"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: founder.accentColor,
              }}
            >
              <founder.icon className="h-3 w-3" />
              {founder.expertise}
            </div>

            {/* bio */}
            <p className="text-xs text-[#8fa8c2] leading-relaxed mb-4 flex-1 overflow-hidden">
              {founder.bio}
            </p>

            {/* focus tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {founder.focus.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium text-[#C7DDEB]/70"
                  style={{
                    background: "rgba(199,221,235,0.06)",
                    border: "1px solid rgba(199,221,235,0.1)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Founders() {
  return (
    <section id="founders" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.2)] rounded-full bg-[rgba(124,58,237,0.06)]">
            The Team
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Meet the Founders
          </h2>
          <p className="mt-4 text-lg text-[#bdb7c8] max-w-2xl mx-auto">
            Four minds, one mission — building the future of digital.
          </p>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder, i) => (
            <FlipCard key={founder.name} founder={founder} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
