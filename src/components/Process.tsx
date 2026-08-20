"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    desc: "We align on your goals, research your target audience, plan the architecture, and establish a conversion-focused strategy.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Custom UI/UX Design",
    desc: "We design high-fidelity layouts focusing on clean structure, premium aesthetics, responsive layouts, and proper hierarchy.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Next.js Development",
    desc: "We custom-code your website using Next.js, Tailwind CSS, and Framer Motion for lightning-fast speeds and fluid animations.",
    icon: Code,
  },
  {
    number: "04",
    title: "QA, SEO & Launch",
    desc: "We run deep optimization tests for speed, test responsiveness, verify security protocols, set up SEO tags, and launch your site.",
    icon: Rocket,
  },
];

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="relative py-24 bg-[#F8F6F2]">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="block mb-3 text-xs font-extrabold uppercase tracking-widest text-[#6F42C1] font-heading"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121212] mb-4"
          >
            Our Process
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-[#555555] text-base sm:text-lg"
          >
            A simple, structured 4-step timeline from brief to deployment.
          </motion.p>
        </div>

        {/* Timeline Grid (4 steps) */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Connecting line for desktop/tablet */}
          <div className="absolute top-16 left-8 right-8 h-0.5 bg-gradient-to-r from-[#6F42C1]/10 via-[#6F42C1]/30 to-[#6F42C1]/10 hidden lg:block z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, pointerEvents: "none" }}
                whileInView={{ opacity: 1, y: 0, pointerEvents: "auto" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 + (idx * 0.08), ease: "easeOut" }}
                className="relative bg-white border border-[#E8E8E8] rounded-[18px] p-6.5 shadow-[0_4px_12px_rgba(0,0,0,0.01)] z-10 flex flex-col items-start hover:border-[#6F42C1]/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-300 ease-out"
              >
                {/* Step Number Badge */}
                <div className="absolute top-4 right-6 text-3xl font-heading font-black text-[#6F42C1]/10">
                  {step.number}
                </div>

                {/* Circle Icon */}
                <div className="w-12 h-12 rounded-[14px] bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] mb-5 border border-[#6F42C1]/20">
                  <Icon size={20} className="stroke-[2.2]" />
                </div>

                <h3 className="text-lg font-heading font-extrabold text-[#121212] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
