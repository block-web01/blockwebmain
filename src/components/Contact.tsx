"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";

// ── helpers ──────────────────────────────────────────────────────────────────

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const TIME_SLOTS = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM",
];

const SERVICE_OPTIONS = [
  "App Development",
  "Web Development",
  "UI/UX Development",
  "Others",
];

function datesEqual(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(d: Date | null) {
  if (!d) return "";
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}

// ── Mini Calendar ─────────────────────────────────────────────────────────────

interface CalendarPickerProps {
  label: string;
  selected: Date | null;
  onSelect: (d: Date) => void;
  /** All dates on or before this date will be disabled (used for Slot 2) */
  afterDate?: Date | null;
}

function CalendarPicker({ label, selected, onSelect, afterDate }: CalendarPickerProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-3 flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        {label}
      </p>
      <div className="rounded-xl border border-[rgba(124,58,237,0.14)] bg-[#130e1a] p-4">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 rounded-lg hover:bg-[rgba(124,58,237,0.15)] transition-colors text-[#bdb7c8]"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-white">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 rounded-lg hover:bg-[rgba(124,58,237,0.15)] transition-colors text-[#bdb7c8]"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[10px] font-medium text-[#bdb7c8]/50 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />;

            const isPast = date < today;
            const isAfterBlocked = afterDate ? date <= afterDate : false;
            const isDisabled = isPast || isAfterBlocked;
            const isSelected = datesEqual(date, selected);
            const isToday = datesEqual(date, today);

            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onSelect(date)}
                className={[
                  "relative text-xs py-1.5 rounded-lg transition-all duration-150 font-medium",
                  isSelected
                    ? "bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] text-white shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                    : isDisabled
                    ? "text-[#bdb7c8]/20 cursor-not-allowed"
                    : isToday
                    ? "text-[#8b5cf6] hover:bg-[rgba(124,58,237,0.15)]"
                    : "text-[#bdb7c8] hover:bg-[rgba(124,58,237,0.12)] hover:text-white",
                ].join(" ")}
              >
                {date.getDate()}
                {isToday && !isSelected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#8b5cf6]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected display */}
        <div className="mt-3 pt-3 border-t border-[rgba(124,58,237,0.1)] text-center">
          <span className="text-xs text-[#bdb7c8]/60">
            {selected ? formatDate(selected) : "No date selected"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Time Slot Picker ──────────────────────────────────────────────────────────

interface TimeSlotPickerProps {
  label: string;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelect: (t: string) => void;
}

function TimeSlotPicker({ label, selectedDate, selectedTime, onSelect }: TimeSlotPickerProps) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-3 flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {label}
      </p>
      <div className="rounded-xl border border-[rgba(124,58,237,0.14)] bg-[#130e1a] p-4 h-[calc(100%-28px)]">
        {!selectedDate ? (
          <div className="flex items-center justify-center h-full min-h-[180px]">
            <p className="text-xs text-[#bdb7c8]/40 text-center">Select a date first</p>
          </div>
        ) : (
          <>
            <p className="text-[11px] text-[#bdb7c8]/60 mb-3 text-center">
              {formatDate(selectedDate)}
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelect(slot)}
                  className={[
                    "w-full py-2 px-3 rounded-lg text-xs font-medium transition-all duration-150 text-left",
                    selectedTime === slot
                      ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                      : "bg-[#1a1525] text-[#bdb7c8] hover:bg-[rgba(124,58,237,0.15)] hover:text-white border border-[rgba(124,58,237,0.08)] hover:border-[rgba(124,58,237,0.25)]",
                  ].join(" ")}
                >
                  {slot}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const [date1, setDate1] = useState<Date | null>(null);
  const [time1, setTime1] = useState<string | null>(null);
  const [date2, setDate2] = useState<Date | null>(null);
  const [time2, setTime2] = useState<string | null>(null);

  function handleDate1(d: Date) {
    setDate1(d);
    setTime1(null);
    if (datesEqual(d, date2)) { setDate2(null); setTime2(null); }
  }

  function handleDate2(d: Date) {
    setDate2(d);
    setTime2(null);
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07030a] via-[#0a0610] to-[#07030a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] border border-[rgba(124,58,237,0.2)] rounded-full bg-[rgba(124,58,237,0.06)]">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Let&apos;s Build Together
          </h2>
          <p className="mt-4 text-lg text-[#bdb7c8]">
            Ready to start your next project? Reach out.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-[14px] border border-[rgba(124,58,237,0.12)] bg-[#0f0b12] p-8 md:p-10 overflow-hidden"
        >
          {/* Animated background paths — scoped only to this card */}
          <BackgroundPaths />

          {/* All form content sits above the paths */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] flex items-center justify-center">
                    <Send className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-[#bdb7c8]">We&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#bdb7c8] mb-2">
                      Name
                    </label>
                    <input
                      id="name" type="text" required placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white placeholder:text-[#bdb7c8]/40 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#bdb7c8] mb-2">
                      Email
                    </label>
                    <input
                      id="email" type="email" required placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white placeholder:text-[#bdb7c8]/40 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#bdb7c8] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message" required rows={4} placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-white placeholder:text-[#bdb7c8]/40 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Service selector — single-select */}
                  <div>
                    <p className="text-sm font-medium text-[#bdb7c8] mb-3">
                      What are you looking for?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map(service => {
                        const active = selectedService === service;
                        return (
                          <motion.button
                            key={service}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedService(active ? null : service)}
                            className={[
                              "px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150",
                              active
                                ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white border-transparent shadow-[0_0_14px_rgba(124,58,237,0.35)]"
                                : "bg-[#1a1525] text-[#bdb7c8] border-[rgba(124,58,237,0.15)] hover:border-[rgba(124,58,237,0.4)] hover:text-white",
                            ].join(" ")}
                          >
                            {service}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[rgba(124,58,237,0.1)]" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-[#0f0b12] text-xs text-[#bdb7c8]/50 uppercase tracking-widest">
                        Preferred Meeting Times
                      </span>
                    </div>
                  </div>

                  {/* Slot 1 */}
                  <div>
                    <p className="text-sm font-medium text-[#bdb7c8] mb-4">
                      <span className="text-[#8b5cf6] font-bold">Slot 1</span>
                      <span className="ml-2 text-[#bdb7c8]/50 text-xs">Pick your preferred date &amp; time</span>
                    </p>
                    <div className="flex gap-4 items-start">
                      <CalendarPicker
                        label="Date 1"
                        selected={date1}
                        onSelect={handleDate1}
                      />
                      <TimeSlotPicker
                        label="Time 1"
                        selectedDate={date1}
                        selectedTime={time1}
                        onSelect={setTime1}
                      />
                    </div>
                  </div>

                  {/* Slot 2 */}
                  <div>
                    <p className="text-sm font-medium text-[#bdb7c8] mb-4">
                      <span className="text-[#8b5cf6] font-bold">Slot 2</span>
                      <span className="ml-2 text-[#bdb7c8]/50 text-xs">Pick an alternative date &amp; time</span>
                    </p>
                    <div className="flex gap-4 items-start">
                      <CalendarPicker
                        label="Date 2"
                        selected={date2}
                        onSelect={handleDate2}
                        afterDate={date1}
                      />
                      <TimeSlotPicker
                        label="Time 2"
                        selectedDate={date2}
                        selectedTime={time2}
                        onSelect={setTime2}
                      />
                    </div>
                  </div>

                  {/* Summary chips */}
                  {(date1 || date2) && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap gap-2"
                    >
                      {date1 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.2)] text-xs text-[#c4b5fd]">
                          <Calendar className="h-3 w-3" />
                          Slot 1: {formatDate(date1)}{time1 ? ` · ${time1}` : ""}
                        </span>
                      )}
                      {date2 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.2)] text-xs text-[#c4b5fd]">
                          <Calendar className="h-3 w-3" />
                          Slot 2: {formatDate(date2)}{time2 ? ` · ${time2}` : ""}
                        </span>
                      )}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-shadow duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Let&apos;s Build Together
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
