"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
    featured: false,
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
      "Ongoing maintenance & SLA",
    ],
    cta: "Contact Sales",
    href: "#contact",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
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
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-[#bdb7c8] max-w-2xl mx-auto">
            No subscriptions. Pay per project, or talk to us about a custom plan.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <GlowCard
                glowColor="darkBlue"
                customSize
                className={`w-full !aspect-auto [--backdrop:hsl(218_60%_4%/1)] [--backup-border:hsl(215_50%_15%/0.5)] [--lightness:55] [--saturation:80] [--bg-spot-opacity:0.08] [--border-spot-opacity:0.6] [--border-light-opacity:0.3] ${
                  plan.featured
                    ? "border-[rgba(124,58,237,0.35)]"
                    : ""
                }`}
              >
                <div className="relative z-10 flex flex-col p-8 gap-6">
                  {/* Plan name */}
                  <div>
                    {plan.featured && (
                      <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.3)] rounded-full bg-[rgba(124,58,237,0.08)]">
                        Most Flexible
                      </span>
                    )}
                    <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  </div>

                  {/* Price */}
                  {plan.price ? (
                    <div className="flex items-end gap-2">
                      <span className="text-6xl font-black text-white leading-none">
                        {plan.price}
                        <span className="text-3xl text-[#8b5cf6]">$</span>
                      </span>
                      <span className="text-[#bdb7c8] text-sm mb-1">{plan.suffix}</span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black text-[#bdb7c8] leading-none">
                        Let&apos;s talk
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-[#bdb7c8] text-sm leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-[rgba(124,58,237,0.15)]" />

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center">
                          <Check className="h-3 w-3 text-[#8b5cf6]" />
                        </div>
                        <span className="text-sm text-[#bdb7c8]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href={plan.href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`mt-2 block text-center px-6 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      plan.featured
                        ? "text-white bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                        : "text-white border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] hover:bg-[rgba(124,58,237,0.15)] hover:border-[rgba(124,58,237,0.5)]"
                    }`}
                  >
                    {plan.cta}
                  </motion.a>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
