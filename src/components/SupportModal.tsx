"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";

export function SupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", issue: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.issue,
          service: "Support Ticket", // Matches the backend requirement and flags it as support
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: "", email: "", issue: "" });
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!loading ? onClose : undefined}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0610] border border-[rgba(124,58,237,0.2)] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.2)] z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-[rgba(124,58,237,0.1)] flex items-center justify-between bg-[rgba(124,58,237,0.02)]">
              <div>
                <h2 className="text-xl font-bold text-white">Help & Support</h2>
                <p className="text-sm text-[#bdb7c8] mt-1">Submit an issue and we&apos;ll help you out.</p>
              </div>
              <button
                onClick={onClose}
                disabled={loading}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1525] border border-[rgba(124,58,237,0.1)] text-[#bdb7c8] hover:text-white hover:border-[#8b5cf6] transition-all disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {success ? (
                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-2">Issue Submitted!</h3>
                  <p className="text-sm text-[#bdb7c8]">Our team will review it in the admin panel shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider mb-1.5 block">Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#1a1525] border border-[rgba(124,58,237,0.15)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider mb-1.5 block">Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#1a1525] border border-[rgba(124,58,237,0.15)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider mb-1.5 block">Describe Your Issue</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.issue}
                      onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                      className="w-full bg-[#1a1525] border border-[rgba(124,58,237,0.15)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none custom-scrollbar"
                      placeholder="I am having trouble with..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? "Submitting..." : "Submit Support Ticket"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
