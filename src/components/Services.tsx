"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Palette } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Full-stack web systems engineered for speed, scalability, and security.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "High-performance mobile and cross-platform applications.",
  },
  {
    icon: Palette,
    title: "UI/UX Development",
    description:
      "Intelligent and research-driven interface design.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
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
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-[#bdb7c8] max-w-2xl mx-auto">
            Precision-crafted digital solutions that drive results.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative rounded-[14px] border border-[rgba(124,58,237,0.12)] bg-[#0f0b12] p-8 hover:border-[rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.12)] transition-all duration-300"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[rgba(124,58,237,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(124,58,237,0.15)] to-[rgba(76,29,149,0.1)] border border-[rgba(124,58,237,0.15)]">
                  <service.icon className="h-6 w-6 text-[#8b5cf6]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-[#bdb7c8] leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
