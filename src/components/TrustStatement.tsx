"use client";

import { motion } from "framer-motion";

export default function TrustStatement() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7c3aed]" />
          <p className="text-xl md:text-2xl font-semibold text-[#bdb7c8]">
            High-efficiency solutions built by{" "}
            <span className="text-white">passionate founders.</span>
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7c3aed]" />
        </motion.div>
      </div>
    </section>
  );
}
