"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-transparent">

      {/* 🔥 ONLY GLOW BOOST (not grid) */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_60%,rgba(168,85,247,0.12),transparent_70%)]" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight">
          Designed with{" "}
          <span className="bg-linear-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
            Intelligence
          </span>.
          <br />
          Executed with{" "}
          <span className="bg-linear-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
            Smartness
          </span>.
        </h1>

        <p className="mt-6 text-lg text-[#bdb7c8]">
          We deliver high-efficiency digital products engineered for performance,
          scalability, and precision.
        </p>

        <div className="mt-8 flex items-center justify-center">

          <a href="https://wa.me/919939580371?text=Hi%2C%20I%20have%20a%20project%20idea%20can%20we%20discuss%20about%20this%20%3F" target="_blank" rel="noopener noreferrer" className="group px-8 py-3 rounded-full bg-linear-to-r from-[#8b5cf6] to-[#5b21b6] text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.85)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden glossy-btn flex items-center justify-center">
            Let’s Chat
            <ArrowUpRight className="ml-2 h-4 w-4 transition-all duration-300 transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
          </a>

        </div>
      </motion.div>
    </section>
  );
}