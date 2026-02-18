"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, X, Layers, Code2, Palette, Zap } from "lucide-react";
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
    tagline: "Driving innovation through intelligent design.",
    expertise: "UI/UX & Product Design",
    focus: ["Vision", "Client Relations", "Execution"],
    bio: "Gurmit bridges the gap between logic and beauty. His design philosophy is rooted in intelligence — creating interfaces that feel intuitive before the user even thinks.",
    icon: Palette,
    avatarGrad: "from-[#7c3aed] via-[#8b5cf6] to-[#5b21b6]",
    accentColor: "#a78bfa",
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
    tagline: "Transforming ideas into high-impact products.",
    expertise: "Product Strategy & Growth",
    focus: ["Design Systems", "Prototyping", "User Research"],
    bio: "Gabbar is the engine of execution. He translates bold ideas into real-world products with relentless drive, ensuring every project ships with maximum impact and clarity.",
    icon: Zap,
    avatarGrad: "from-[#4c1d95] via-[#7c3aed] to-[#6d28d9]",
    accentColor: "#c4b5fd",
  },
];

function ModernAvatar({
  founder,
  size = "lg",
}: {
  founder: (typeof founders)[0];
  size?: "lg" | "xl";
}) {
  const Icon = founder.icon;
  const dim = size === "xl" ? "h-20 w-20" : "h-16 w-16";
  const iconSize = size === "xl" ? "h-9 w-9" : "h-7 w-7";
  return (
    <div
      className={`relative ${dim} rounded-2xl bg-gradient-to-br ${founder.avatarGrad} flex items-center justify-center shadow-lg`}
    >
      {/* inner glow ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      {/* subtle shine */}
      <div className="absolute top-1 left-2 h-3 w-6 rounded-full bg-white/20 blur-sm" />
      <Icon className={`${iconSize} text-white/90 drop-shadow-sm`} strokeWidth={1.6} />
    </div>
  );
}

export default function Founders() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (name: string) =>
    setExpanded((prev) => (prev === name ? null : name));

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {founders.map((founder, i) => {
            const isExpanded = expanded === founder.name;

            return (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                layout
                onClick={() => toggle(founder.name)}
                style={{ cursor: "pointer" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!isExpanded ? (
                    /* ── DEFAULT CARD ── */
                    <motion.div
                      key="card"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{
                        y: -8,
                        scale: 1.03,
                        transition: { duration: 0.22 },
                      }}
                      className="group relative rounded-[14px] border border-[rgba(124,58,237,0.12)] bg-[#0f0b12] p-7
                        hover:border-[rgba(124,58,237,0.35)]
                        hover:shadow-[0_8px_40px_rgba(124,58,237,0.18)]
                        hover:bg-[#0A2540]
                        transition-all duration-300 select-none"
                    >
                      {/* hover gradient overlay */}
                      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[rgba(10,37,64,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="mb-5">
                          <ModernAvatar founder={founder} size="lg" />
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#C7DDEB] transition-colors duration-300">
                            {founder.name}
                          </h3>
                          <BadgeCheck className="h-4 w-4 text-[#8b5cf6] flex-shrink-0" />
                        </div>

                        <p className="text-sm font-medium text-[#8b5cf6] mb-3 group-hover:text-[#a78bfa] transition-colors duration-300">
                          {founder.role}
                        </p>

                        <p className="text-sm text-[#bdb7c8] leading-relaxed group-hover:text-[#C7DDEB] transition-colors duration-300">
                          {founder.tagline}
                        </p>

                        <p className="mt-4 text-[11px] text-[#6d5e85] group-hover:text-[#8fa8c2] uppercase tracking-widest font-medium transition-colors duration-300">
                          Click to expand
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── EXPANDED GLASSMORPHIC TILE ── */
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, scale: 0.92, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 6 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative rounded-[18px] overflow-hidden select-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(10,37,64,0.72) 0%, rgba(15,11,18,0.85) 100%)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(139,92,246,0.28)",
                        boxShadow:
                          "0 8px 48px rgba(124,58,237,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* top glow bar */}
                      <div
                        className="h-[3px] w-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${founder.accentColor}, transparent)`,
                        }}
                      />

                      <div className="p-6">
                        {/* close button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(null);
                          }}
                          className="absolute top-5 right-5 h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>

                        {/* avatar + name */}
                        <div className="flex items-center gap-4 mb-5">
                          <ModernAvatar founder={founder} size="xl" />
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <h3 className="text-base font-bold text-[#C7DDEB]">
                                {founder.name}
                              </h3>
                              <BadgeCheck
                                className="h-4 w-4 flex-shrink-0"
                                style={{ color: founder.accentColor }}
                              />
                            </div>
                            <p
                              className="text-xs font-semibold uppercase tracking-wider"
                              style={{ color: founder.accentColor }}
                            >
                              {founder.role}
                            </p>
                          </div>
                        </div>

                        {/* expertise badge */}
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-4"
                          style={{
                            background: `rgba(124,58,237,0.12)`,
                            border: `1px solid rgba(139,92,246,0.2)`,
                            color: founder.accentColor,
                          }}
                        >
                          <founder.icon className="h-3 w-3" />
                          {founder.expertise}
                        </div>

                        {/* bio */}
                        <p className="text-sm text-[#8fa8c2] leading-relaxed mb-5">
                          {founder.bio}
                        </p>

                        {/* focus tags */}
                        <div className="flex flex-wrap gap-2">
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
