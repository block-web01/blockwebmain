"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export function LegalModal({ open, onClose, tab }: { open: boolean; onClose: () => void; tab: "terms" | "privacy" }) {
  const [activeTab, setActiveTab] = useState(tab);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#0a0610] border border-[rgba(124,58,237,0.2)] rounded-3xl p-6 md:p-8 flex flex-col shadow-[0_0_60px_rgba(124,58,237,0.15)] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-4 p-1 bg-[#1a1525] rounded-xl border border-[rgba(124,58,237,0.1)]">
                <button
                  onClick={() => setActiveTab("terms")}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === "terms"
                      ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white shadow-lg"
                      : "text-[#bdb7c8] hover:text-white"
                  }`}
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === "privacy"
                      ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white shadow-lg"
                      : "text-[#bdb7c8] hover:text-white"
                  }`}
                >
                  Privacy Policy
                </button>
              </div>
              
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1525] border border-[rgba(124,58,237,0.1)] text-[#bdb7c8] hover:text-white hover:border-[#8b5cf6] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto pr-4 custom-scrollbar text-[#bdb7c8] leading-relaxed space-y-6">
              {activeTab === "terms" ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-4">Terms and Conditions</h2>
                  <p>Welcome to Block Web. By accessing our platform, you agree to these terms of service. Our comprehensive suite of web and app development solutions is engineered for precision and rapid deployment.</p>
                  
                  <h3 className="text-lg font-bold text-white mt-6">1. Usage Rights</h3>
                  <p>All delivered code, assets, and infrastructure configurations become the unified intellectual property of the client post-final-payment. Until such point, Block Web retains all licensing and copyrights.</p>
                  
                  <h3 className="text-lg font-bold text-white mt-6">2. Limitation of Liability</h3>
                  <p>Block Web shall not be held liable for indirect data loss, downtime, or disruption of third-party APIs beyond our direct control. We provision highly resilient systems, but external integrations carry intrinsic risks.</p>

                  <h3 className="text-lg font-bold text-white mt-6">3. Dispute Resolution</h3>
                  <p>In the event of a dispute, both parties agree to enter into binding arbitration rather than civil court proceedings, ensuring a swift and structured resolution mechanism.</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
                  <p>Your privacy is paramount. Block Web uses industry-standard encryption protocols and zero-trust architectures to handle your organization&apos;s sensitive data securely.</p>
                  
                  <h3 className="text-lg font-bold text-white mt-6">1. Data Collection</h3>
                  <p>We only collect the telemetry, diagnostic, and user-provided configuration data necessary to maintain and optimize your delivered environments. We do not sell data to third-party ad brokers.</p>

                  <h3 className="text-lg font-bold text-white mt-6">2. Cookies and Tracking</h3>
                  <p>Our platform uses essential session tokens and localized storage solely for authenticating admin portals and handling JWT secure sessions. We strictly limit non-essential tracking patterns.</p>
                  
                  <h3 className="text-lg font-bold text-white mt-6">3. Data Deletion</h3>
                  <p>Under GDPR and CCPA compliance, you hold the right to request a complete purge of your account diagnostics and contact information. Contact our administration directly to initiate this protocol.</p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
