"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Clock, MessageSquare, AlertCircle } from "lucide-react";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  slot1: { date: string; time: string };
  slot2: { date: string; time: string };
  status: string;
  createdAt: string;
}

interface QueryHistoryModalProps {
  open: boolean;
  onClose: () => void;
}

export function QueryHistoryModal({ open, onClose }: QueryHistoryModalProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      fetchInquiries();
    }
  }, [open]);

  const fetchInquiries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/user/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      } else {
        setError("Failed to fetch query history.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-500/10 border-green-500/20 text-green-400";
      case "read":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      default:
        return "bg-[#8b5cf6]/10 border-[#8b5cf6]/20 text-[#8b5cf6] animate-pulse";
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
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0610] border border-[rgba(124,58,237,0.2)] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.2)] z-10 flex flex-col max-h-[85vh] m-4"
          >
            {/* Header */}
            <div className="p-6 border-b border-[rgba(124,58,237,0.1)] flex items-center justify-between bg-[rgba(124,58,237,0.02)]">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#8b5cf6]" />
                  Your Query History
                </h2>
                <p className="text-xs text-[#bdb7c8] mt-1">Review the status of your submitted inquiries.</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1525] border border-[rgba(124,58,237,0.1)] text-[#bdb7c8] hover:text-white hover:border-[#8b5cf6] transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 text-[#8b5cf6] animate-spin" />
                  <p className="text-sm text-[#bdb7c8] mt-3">Loading your history...</p>
                </div>
              ) : error ? (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
                  <p className="text-sm text-[#bdb7c8]">{error}</p>
                  <button
                    onClick={fetchInquiries}
                    className="mt-4 px-4 py-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] rounded-xl text-xs hover:bg-[#8b5cf6]/20 transition-all font-semibold"
                  >
                    Try Again
                  </button>
                </div>
              ) : inquiries.length > 0 ? (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className="border border-[rgba(124,58,237,0.12)] bg-[#130e1a]/40 rounded-2xl p-5 hover:border-[rgba(124,58,237,0.25)] transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b5cf6]/60">Service</span>
                          <h4 className="text-sm font-bold text-white mt-0.5">{inq.service || "General Inquiry"}</h4>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${getStatusStyle(inq.status)}`}>
                          {inq.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b5cf6]/60">Message</span>
                        <p className="text-sm text-[#bdb7c8] mt-1 bg-[#1a1525]/30 p-3 rounded-xl border border-[rgba(124,58,237,0.03)] whitespace-pre-wrap leading-relaxed">
                          {inq.message}
                        </p>
                      </div>

                      {/* Display slots if they exist */}
                      {(inq.slot1 || inq.slot2) && (
                        <div className="border-t border-[rgba(124,58,237,0.08)] pt-3 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {inq.slot1 && (
                            <div className="bg-[rgba(124,58,237,0.03)] border border-[rgba(124,58,237,0.05)] p-2.5 rounded-xl">
                              <span className="text-[9px] font-bold text-[#bdb7c8]/60 uppercase tracking-widest block mb-1">Preferred Slot 1</span>
                              <div className="flex items-center gap-4 text-[10px] text-white">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#8b5cf6]" /> {new Date(inq.slot1.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#8b5cf6]" /> {inq.slot1.time}</span>
                              </div>
                            </div>
                          )}
                          {inq.slot2 && (
                            <div className="bg-[rgba(124,58,237,0.03)] border border-[rgba(124,58,237,0.05)] p-2.5 rounded-xl">
                              <span className="text-[9px] font-bold text-[#bdb7c8]/60 uppercase tracking-widest block mb-1">Alternative Slot 2</span>
                              <div className="flex items-center gap-4 text-[10px] text-white">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#8b5cf6]" /> {new Date(inq.slot2.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#8b5cf6]" /> {inq.slot2.time}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex justify-end text-[10px] text-[#bdb7c8]/40 mt-3 pt-2 border-t border-[rgba(124,58,237,0.04)]">
                        Submitted on {new Date(inq.createdAt).toLocaleDateString()} at {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-[#bdb7c8]/20 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-1">No inquiries yet</h3>
                  <p className="text-xs text-[#bdb7c8]/60 max-w-xs">Submit a project or support request below and it will appear here.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
