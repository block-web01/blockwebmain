"use client";

import { motion } from "framer-motion";

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
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
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

        <div className="mt-8 flex items-center justify-center gap-4">

          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-full bg-linear-to-r from-[#8b5cf6] to-[#5b21b6] text-white font-semibold 
          shadow-[0_0_25px_rgba(124,58,237,0.35)]
          hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.6)]
          transition-[transform,box-shadow] duration-300">
            Get in Touch
          </button>

          <button 
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-full border border-[rgba(124,58,237,0.3)] text-white 
          bg-[rgba(255,255,255,0.02)]
          hover:bg-[rgba(124,58,237,0.1)]
          hover:border-[#8b5cf6]
          transition-colors duration-300">
            View Services
          </button>

        </div>
      </motion.div>
    </section>
  );
}