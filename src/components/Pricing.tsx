"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";

const plans = [
  {
    name: "Pro",
    price: "199",
    suffix: "/ project",
    description: "Everything you need to launch a polished digital product.",
    features: [
      "Full-stack web development",
      "Responsive UI/UX design",
      "Performance optimization",
      "2 rounds of revisions",
      "30-day post-launch support",
    ],
    cta: "Get Started",
    href: "#contact",
    featured: false, // ❌ removed tag from Pro
  },
  {
    name: "Custom",
    price: null,
    suffix: null,
    description: "Tailored solutions for complex, large-scale requirements.",
    features: [
      "Everything in Pro",
      "Dedicated project manager",
      "Custom architecture & integrations",
      "Priority delivery",
      "Ongoing maintenance & support",
    ],
    cta: "Contact Sales",
    href: "#contact",
    featured: true,
  },
];

export default function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.2)] rounded-full bg-[rgba(124,58,237,0.06)]">
            Pricing
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Simple, Transparent Pricing
          </h2>

          <p className="mt-4 text-lg text-[#bdb7c8] max-w-2xl mx-auto">
            No subscriptions. Pay per project, or talk to us about a custom plan.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, i) => {
            const isHovered = hovered === i;

            return (
              <motion.div
                key={plan.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--x) var(--y), rgba(124,58,237,0.25), transparent 40%)",
                  }}
                />

                <GlowCard className="w-full h-full relative z-10">
                  <div
                    className="relative z-10 flex flex-col h-full p-8 gap-6"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty("--x", `${x}px`);
                      e.currentTarget.style.setProperty("--y", `${y}px`);
                    }}
                  >
                    {/* TOP CONTENT */}
                    <div className="flex flex-col gap-6">
                      {/* Plan */}
                      <div>
                        {plan.featured && (
                          <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.3)] rounded-full bg-[rgba(124,58,237,0.08)]">
                            Most Flexible
                          </span>
                        )}

                        <h3 className="text-2xl font-black text-white">
                          {plan.name}
                        </h3>
                      </div>

                      {/* Price */}
                      {plan.price ? (
                        <div className="flex items-end gap-2">
                          <span className="text-6xl font-black text-white">
                            {plan.price}
                            <span className="text-3xl text-[#8b5cf6]">$</span>
                          </span>
                          <span className="text-[#bdb7c8] text-sm">
                            {plan.suffix}
                          </span>
                        </div>
                      ) : (
                        <span className="text-3xl font-black text-white">
                          Let&apos;s talk
                        </span>
                      )}

                      <p className="text-[#bdb7c8] text-sm">
                        {plan.description}
                      </p>

                      <div className="h-px bg-[rgba(124,58,237,0.15)]" />

                      {/* Features */}
                      <ul className="flex flex-col gap-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            
                            {/* DIMMED GLOW (-15%) */}
                            <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[rgba(124,58,237,0.18)] shadow-[0_0_8px_rgba(124,58,237,0.65)]">
                              <Check className="h-3 w-3 text-[#d8b4fe]" />
                            </div>

                            <span className="text-sm text-[#bdb7c8]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA (FORCED BOTTOM ALIGN) */}
                    <motion.a
                      href={plan.href}
                      whileTap={{ scale: 0.95 }}
                      className="mt-auto block text-center px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-linear-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all"
                    >
                      {plan.cta}
                    </motion.a>

                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}