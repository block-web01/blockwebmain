"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { useCurrency } from "@/lib/currency";

export default function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Centralized currency & formatting hook
  const { currency, formatPrice, mounted } = useCurrency();

  // Pro plan type: 2D vs 3D
  const [proType, setProType] = useState<"2D" | "3D">("3D");

  // Custom plan interactive selections
  const [customType, setCustomType] = useState<"2D" | "3D">("2D");
  const [customPages, setCustomPages] = useState<number>(6);
  const [customDesign, setCustomDesign] = useState<boolean>(false);
  const [customAnimations, setCustomAnimations] = useState<boolean>(false);
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);

  // Available features to add to the Custom plan
  const addonOptions = [
    { id: "cms", label: "Headless CMS" },
    { id: "ecomm", label: "E-Commerce" },
    { id: "booking", label: "Booking Systems" },
    { id: "auth", label: "User Auth & DB" },
    { id: "api", label: "APIs & Integrations" }
  ];

  // Dynamic pricing calculation
  const getProPrice = () => {
    if (currency.countryCode === "IN") {
      return proType === "3D" ? 25000 : 20000;
    }
    return proType === "3D" ? 699 : 499;
  };

  const getCustomPrice = () => {
    const isIndia = currency.countryCode === "IN";

    // Base Rates (6 pages 2D)
    const basePrice = isIndia ? 30000 : 899;
    const pageRate = isIndia ? 2000 : 75;
    const upgrade3D = isIndia ? 8000 : 250;
    const designMod = isIndia ? 5000 : 150;
    const animationMod = isIndia ? 4000 : 100;
    const featureRate = isIndia ? 3000 : 100;

    // Pro Price for floor comparisons
    const activeProPrice = isIndia
      ? (customType === "3D" ? 25000 : 20000)
      : (customType === "3D" ? 699 : 499);

    const minPremium = isIndia ? 5000 : 200;

    // Calculate
    const extraPages = Math.max(0, customPages - 6);
    let calculated = basePrice;
    calculated += extraPages * pageRate;
    calculated += customType === "3D" ? upgrade3D : 0;
    calculated += customDesign ? designMod : 0;
    calculated += customAnimations ? animationMod : 0;
    calculated += customFeatures.length * featureRate;

    // Price Floor Protections
    const finalPrice = Math.max(calculated, basePrice, activeProPrice + minPremium);
    return finalPrice;
  };

  const toggleFeature = (id: string) => {
    if (customFeatures.includes(id)) {
      setCustomFeatures(customFeatures.filter((f) => f !== id));
    } else {
      setCustomFeatures([...customFeatures, id]);
    }
  };

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
          <span className="block mb-4 text-xs font-extrabold uppercase tracking-widest text-[#8b5cf6] font-heading">
            Pricing
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Simple, Transparent Pricing
          </h2>

          <p className="mt-4 text-lg text-[#bdb7c8] max-w-2xl mx-auto">
            No subscriptions. Pay per project, or configure a tailored customizable package.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          
          {/* Card 1: Pro Plan */}
          <div
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) {
                setHovered(0);
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover)").matches) {
                setHovered(null);
              }
            }}
            onMouseMove={(e) => {
              if (!window.matchMedia("(hover: hover)").matches) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--x", `${x}px`);
              e.currentTarget.style.setProperty("--y", `${y}px`);
            }}
            className="relative h-full"
          >
            {/* Hover Glow */}
            <div
              className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                hovered === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(600px circle at var(--x) var(--y), rgba(124,58,237,0.25), transparent 40%)",
              }}
            />

            <GlowCard customSize className="w-full h-full relative z-10">
              <div className="relative z-10 flex flex-col h-full p-8 gap-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      Pro Plan
                    </h3>
                  </div>

                  {/* Pro 2D/3D Selector */}
                  <div className="relative flex p-1 bg-[#150d22] rounded-xl border border-[rgba(124,58,237,0.15)] max-w-full">
                    <button
                      type="button"
                      onClick={() => setProType("2D")}
                      className={`flex-1 text-center py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        proType === "2D"
                          ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                          : "text-[#bdb7c8] hover:text-white"
                      }`}
                    >
                      2D Website
                    </button>
                    <button
                      type="button"
                      onClick={() => setProType("3D")}
                      className={`flex-1 text-center py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        proType === "3D"
                          ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                          : "text-[#bdb7c8] hover:text-white"
                      }`}
                    >
                      3D Website
                      <Sparkles className="w-3.5 h-3.5 text-[#eab308] animate-pulse" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-2 h-16">
                    <span className="text-5xl font-black text-white transition-all duration-300">
                      {formatPrice(getProPrice())}
                    </span>
                    <span className="text-[#bdb7c8] text-sm mb-1">
                      / project
                    </span>
                  </div>

                  <p className="text-[#bdb7c8] text-sm">
                    Everything you need to launch a polished digital product.
                  </p>

                  <div className="h-px bg-[rgba(124,58,237,0.15)]" />

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {[
                      "6 pages web design",
                      proType === "3D" ? "WebGL & Three.js 3D interactions" : "Modern 2D layouts & graphics",
                      "Responsive UI/UX design (mobile-first)",
                      "Performance & SEO optimization",
                      "2 rounds of revisions",
                      "30-day post-launch support",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full flex items-center justify-center bg-[rgba(124,58,237,0.18)] shadow-[0_0_8px_rgba(124,58,237,0.65)] shrink-0">
                          <Check className="h-3 w-3 text-[#d8b4fe]" />
                        </div>
                        <span className="text-sm text-[#bdb7c8]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto block text-center px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all cursor-pointer"
                >
                  Get Started
                </motion.a>
              </div>
            </GlowCard>
          </div>

          {/* Card 2: Custom Plan */}
          <div
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) {
                setHovered(1);
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover)").matches) {
                setHovered(null);
              }
            }}
            onMouseMove={(e) => {
              if (!window.matchMedia("(hover: hover)").matches) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--x", `${x}px`);
              e.currentTarget.style.setProperty("--y", `${y}px`);
            }}
            className="relative h-full"
          >
            {/* Hover Glow */}
            <div
              className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                hovered === 1 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(600px circle at var(--x) var(--y), rgba(124,58,237,0.25), transparent 40%)",
              }}
            />

            <GlowCard customSize className="w-full h-full relative z-10">
              <div className="relative z-10 flex flex-col h-full p-8 gap-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="block mb-3 text-xs font-extrabold uppercase tracking-widest text-[#8b5cf6] font-heading">
                      Most Flexible
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      Custom Plan
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-2 h-16">
                    <span className="text-5xl font-black text-white transition-all duration-300">
                      {formatPrice(getCustomPrice())}
                    </span>
                    <span className="text-[#bdb7c8] text-sm mb-1">
                      / project
                    </span>
                  </div>

                  <p className="text-[#bdb7c8] text-sm">
                    Configure your custom requirements below. The price updates in real-time.
                  </p>

                  <div className="h-px bg-[rgba(124,58,237,0.15)]" />

                  {/* Calculator Inputs */}
                  <div className="flex flex-col gap-4">
                    {/* 2D vs 3D Selection */}
                    <div>
                      <span className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider mb-2 block">
                        Website Layout
                      </span>
                      <div className="flex p-1 bg-[#150d22] rounded-xl border border-[rgba(124,58,237,0.15)]">
                        <button
                          type="button"
                          onClick={() => setCustomType("2D")}
                          className={`flex-1 text-center py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                            customType === "2D"
                              ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white"
                              : "text-[#bdb7c8] hover:text-white"
                          }`}
                        >
                          2D Layout
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomType("3D")}
                          className={`flex-1 text-center py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            customType === "3D"
                              ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white"
                              : "text-[#bdb7c8] hover:text-white"
                          }`}
                        >
                          3D/WebGL ✨
                        </button>
                      </div>
                    </div>

                    {/* Page Count Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider">
                          Scope (Page Count)
                        </span>
                        <span className="text-xs font-mono text-white bg-[rgba(124,58,237,0.15)] px-2 py-0.5 rounded border border-[rgba(124,58,237,0.25)]">
                          {customPages} pages
                        </span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="30"
                        value={customPages}
                        onChange={(e) => setCustomPages(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-[#150d22] rounded-lg appearance-none cursor-pointer accent-[#8b5cf6]"
                      />
                      <div className="flex justify-between text-[10px] text-[#bdb7c8]/50 mt-1 font-mono">
                        <span>6</span>
                        <span>12</span>
                        <span>18</span>
                        <span>24</span>
                        <span>30+</span>
                      </div>
                    </div>

                    {/* Complexity Upgrades */}
                    <div>
                      <span className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider mb-2 block">
                        Complexity Upgrades
                      </span>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setCustomDesign(!customDesign)}
                          className={`flex items-center gap-3 justify-start py-2 px-3 rounded-xl border transition-all text-left cursor-pointer text-xs font-semibold ${
                            customDesign
                              ? "bg-[rgba(124,58,237,0.12)] border-[#8b5cf6]/40 text-white"
                              : "bg-[#150d22] border-[rgba(124,58,237,0.1)] text-[#bdb7c8] hover:text-white"
                          }`}
                        >
                          <div className="shrink-0">
                            {customDesign ? (
                              <div className="h-4 w-4 rounded bg-[#8b5cf6] flex items-center justify-center">
                                <Check className="h-2.5 w-2.5 text-white" />
                              </div>
                            ) : (
                              <div className="h-4 w-4 rounded border border-[rgba(124,58,237,0.4)]" />
                            )}
                          </div>
                          Advanced Custom UI/UX
                        </button>

                        <button
                          type="button"
                          onClick={() => setCustomAnimations(!customAnimations)}
                          className={`flex items-center gap-3 justify-start py-2 px-3 rounded-xl border transition-all text-left cursor-pointer text-xs font-semibold ${
                            customAnimations
                              ? "bg-[rgba(124,58,237,0.12)] border-[#8b5cf6]/40 text-white"
                              : "bg-[#150d22] border-[rgba(124,58,237,0.1)] text-[#bdb7c8] hover:text-white"
                          }`}
                        >
                          <div className="shrink-0">
                            {customAnimations ? (
                              <div className="h-4 w-4 rounded bg-[#8b5cf6] flex items-center justify-center">
                                <Check className="h-2.5 w-2.5 text-white" />
                              </div>
                            ) : (
                              <div className="h-4 w-4 rounded border border-[rgba(124,58,237,0.4)]" />
                            )}
                          </div>
                          High-End Animations & GSAP
                        </button>
                      </div>
                    </div>

                    {/* Advanced Integrations */}
                    <div>
                      <span className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider mb-2 block">
                        Advanced Integrations
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {addonOptions.map((opt) => {
                          const isSelected = customFeatures.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleFeature(opt.id)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#8b5cf6] border-[#8b5cf6] text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                                  : "bg-[#150d22] border-[rgba(124,58,237,0.1)] text-[#bdb7c8] hover:text-white hover:border-[rgba(124,58,237,0.25)]"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto block text-center px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all cursor-pointer"
                >
                  Contact Sales
                </motion.a>
              </div>
            </GlowCard>
          </div>

        </div>
      </div>
    </section>
  );
}
