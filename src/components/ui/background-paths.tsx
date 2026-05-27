"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 25 * position} -${189 + i * 28}C-${
      380 - i * 25 * position
    } -${189 + i * 28} -${312 - i * 25 * position} ${216 - i * 28} ${
      152 - i * 25 * position
    } ${343 - i * 28}C${616 - i * 25 * position} ${470 - i * 28} ${
      684 - i * 25 * position
    } ${875 - i * 28} ${684 - i * 25 * position} ${875 - i * 28}`,
    width: 0.6 + i * 0.15,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="url(#pathGrad)"
            strokeWidth={path.width}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{
              pathLength: 1,
              opacity: 0.05 + path.id * 0.03,
            }}
            viewport={{ once: true, margin: "100px" }}
            transition={{
              duration: 2.0 + (path.id % 3) * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
        <defs>
          <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Drop this inside any relatively-positioned container to add animated purple path lines in the background. */
export function BackgroundPaths() {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

