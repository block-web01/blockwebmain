"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Nebula Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07030a] via-[#0d0515] to-[#07030a]" />

        {/* Orb 1 */}
        <div className="nebula-orb-1 absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3)_0%,transparent_70%)] blur-3xl" />

        {/* Orb 2 */}
        <div className="nebula-orb-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(91,33,182,0.25)_0%,transparent_70%)] blur-3xl" />

        {/* Orb 3 */}
        <div className="nebula-orb-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_60%)] blur-3xl" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#07030a_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6"
        >
          Designed with{" "}
          <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#5b21b6] bg-clip-text text-transparent">
            Intelligence.
          </span>
          <br />
          Executed with{" "}
          <span className="bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-[#8b5cf6] bg-clip-text text-transparent">
            Smartness.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-2xl text-lg md:text-xl text-[#bdb7c8] leading-relaxed mb-10"
        >
          We deliver high-efficiency digital products engineered for
          performance, scalability, and precision.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-shadow duration-300"
          >
            Get in Touch
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 text-base font-semibold text-white rounded-xl border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] hover:bg-[rgba(124,58,237,0.15)] hover:border-[rgba(124,58,237,0.5)] transition-all duration-300"
          >
            View Services
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
