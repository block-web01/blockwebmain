"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronLeft, ChevronRight, Clock, Calendar, Loader2, ShieldAlert, LogIn, UserPlus, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";

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
    <div className="flex-1 min-w-0 w-full">
      <p className="text-xs font-bold uppercase tracking-widest text-[#6F42C1] mb-2 flex items-center gap-1.5 font-heading">
        <Calendar className="h-3.5 w-3.5" />
        {label}
      </p>
      <div className="rounded-[18px] border border-[#E8E8E8] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.015)]">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 rounded-lg hover:bg-[#F8F6F2] transition-colors text-[#555555] cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-extrabold text-[#121212] font-heading">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 rounded-lg hover:bg-[#F8F6F2] transition-colors text-[#555555] cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1 text-center">
          {DAYS.map(d => (
            <div key={d} className="text-[10px] font-bold text-[#555555]/50 py-1 font-heading">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5 text-center">
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
                className={`relative text-xs py-1.5 rounded-lg transition-all duration-150 font-bold cursor-pointer w-full flex items-center justify-center ${
                  isSelected
                    ? "bg-[#6F42C1] text-white shadow-sm"
                    : isDisabled
                    ? "text-[#121212]/20 cursor-not-allowed"
                    : isToday
                    ? "text-[#6F42C1] bg-[#6F42C1]/10 hover:bg-[#6F42C1]/20"
                    : "text-[#121212] hover:bg-[#F8F6F2] hover:text-[#6F42C1]"
                }`}
              >
                {date.getDate()}
                {isToday && !isSelected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6F42C1]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected display */}
        <div className="mt-3 pt-3 border-t border-[#E8E8E8] text-center">
          <span className="text-[10px] font-bold text-[#555555]">
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
    <div className="flex-1 min-w-0 w-full">
      <p className="text-xs font-bold uppercase tracking-widest text-[#6F42C1] mb-2 flex items-center gap-1.5 font-heading">
        <Clock className="h-3.5 w-3.5" />
        {label}
      </p>
      <div className="rounded-[18px] border border-[#E8E8E8] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.015)] h-[calc(100%-24px)] flex flex-col justify-center min-h-[220px]">
        {!selectedDate ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-[#555555]/50 font-medium text-center">Select a date first</p>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-between">
            <p className="text-[10px] text-[#555555] font-bold mb-3 text-center">
              {formatDate(selectedDate)}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-1.5 max-h-[170px] overflow-y-auto pr-1 no-scrollbar">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelect(slot)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-150 text-left border cursor-pointer ${
                    selectedTime === slot
                      ? "bg-[#6F42C1] text-white border-transparent shadow-sm"
                      : "bg-[#F8F6F2] text-[#121212] border-[#E8E8E8] hover:bg-[#6F42C1]/10 hover:text-[#6F42C1] hover:border-[#6F42C1]/20"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Contact() {
  const { data: session, status } = useSession();
  const [contactAuthOpen, setContactAuthOpen] = useState(false);
  const [contactAuthMode, setContactAuthMode] = useState<"login" | "signup">("login");

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <section id="contact" className="relative py-24 bg-[#F8F6F2]">
      {/* Background grids */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#6F42C1 0.75px, transparent 0.75px)",
        backgroundSize: "32px 32px"
      }} />

      <div className="section-container">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block mb-3 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6F42C1] border border-[#6F42C1]/20 rounded-full bg-[#6F42C1]/5"
          >
            Get In Touch
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121212] mb-4">
            Let&apos;s Build Together
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            Ready to scale your business? Book a call or send a message below.
          </p>
        </div>

        {/* Two-Column Grid: Map/Details vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Business Details & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Details Card */}
            <div className="bg-white border border-[#E8E8E8] rounded-[18px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex flex-col gap-6">
              <h3 className="text-xl font-heading font-extrabold text-[#121212]">
                Contact Information
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-[#555555]">
                  <div className="w-10 h-10 rounded-[14px] bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] border border-[#6F42C1]/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#555555]/60 font-bold uppercase">Email Us</p>
                    <a href="mailto:hello@blockweb.com" className="text-sm font-bold text-[#121212] hover:text-[#6F42C1] transition-colors">
                      hello@blockweb.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#555555]">
                  <div className="w-10 h-10 rounded-[14px] bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] border border-[#6F42C1]/20">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#555555]/60 font-bold uppercase">Call / WhatsApp</p>
                    <a href="https://wa.me/919939580371" className="text-sm font-bold text-[#121212] hover:text-[#6F42C1] transition-colors">
                      +91 99395 80371
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#555555]">
                  <div className="w-10 h-10 rounded-[14px] bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] border border-[#6F42C1]/20">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#555555]/60 font-bold uppercase">Location</p>
                    <p className="text-sm font-bold text-[#121212]">
                      Jaipur, Rajasthan, India (Global operations)
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#E8E8E8] w-full" />

              <p className="text-xs text-[#555555] leading-relaxed">
                We sign Non-Disclosure Agreements (NDA) for all custom development and white-label partnerships, ensuring 100% confidentiality.
              </p>
            </div>

            {/* Google Map Frame */}
            <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden border border-[#E8E8E8] shadow-[0_4px_12px_rgba(0,0,0,0.015)] relative bg-slate-200">
              <iframe
                title="Block Web Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x396db612383c21a3%3A0x67396788db3d219b!2sJaipur%2C+Rajasthan!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT: Call Booking Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-[#E8E8E8] rounded-[18px] p-8 md:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.015)] overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 min-h-[450px] flex flex-col items-center justify-center"
                  >
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-linear-to-br from-[#6F42C1] to-[#5a2eab] flex items-center justify-center shadow-sm">
                      <Send className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-[#121212] mb-2">Message Sent Successfully!</h3>
                    <p className="text-[#555555] mb-8 max-w-sm mx-auto">We have received your details and preferred meeting times. Our team will get back to you shortly.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setSelectedService(null);
                          setDate1(null);
                          setDate2(null);
                          setTime1(null);
                          setTime2(null);
                        }}
                        className="px-6 py-2.5 rounded-full border border-[#E8E8E8] hover:border-[#6F42C1] text-[#121212] hover:text-[#6F42C1] text-sm font-bold transition-colors cursor-pointer bg-white"
                      >
                        Send Another
                      </button>
                      <button
                        onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-6 py-2.5 rounded-full btn-primary-gradient text-white text-sm font-bold shadow-md hover:scale-[1.03] transition-all cursor-pointer"
                      >
                        Return Home
                      </button>
                    </div>
                  </motion.div>
                ) : status !== "authenticated" ? (
                  <motion.div
                    key="auth-required"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center py-16 text-center min-h-[450px]"
                  >
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-[#6F42C1]/10 rounded-full blur-xl scale-125 animate-pulse" />
                      <div className="relative mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-[#6F42C1] to-[#5a2eab] flex items-center justify-center border border-[#6F42C1]/20 shadow-md">
                        <ShieldAlert className="h-10 w-10 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-heading font-extrabold text-[#121212] mb-3">
                      Authentication Required
                    </h3>
                    
                    <p className="max-w-md text-sm text-[#555555] mb-8 leading-relaxed">
                      To prevent spam and link preferred call slot entries to a validated user record, please log in or create a quick account below.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setContactAuthMode("login");
                          setContactAuthOpen(true);
                        }}
                        className="w-full py-3.5 px-6 rounded-[14px] btn-primary-gradient text-white font-bold hover:scale-[1.02] hover:shadow-[0_4px_14px_rgba(111,66,193,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <LogIn size={18} />
                        Log In
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setContactAuthMode("signup");
                          setContactAuthOpen(true);
                        }}
                        className="w-full py-3.5 px-6 rounded-[14px] bg-[#F8F6F2] border border-[#E8E8E8] hover:border-[#6F42C1]/20 text-[#121212] hover:text-[#6F42C1] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <UserPlus size={18} />
                        Create Account
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (isSubmitting) return;
                      
                      setIsSubmitting(true);
                      const formData = new FormData(e.currentTarget);
                      const data = {
                        name: formData.get("name"),
                        email: formData.get("email"),
                        phone: formData.get("phone"),
                        message: formData.get("message"),
                        service: selectedService,
                        slot1: date1 ? { date: date1, time: time1 } : null,
                        slot2: date2 ? { date: date2, time: time2 } : null,
                      };

                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(data),
                        });
                        if (res.ok) {
                          setSubmitted(true);
                          window.scrollBy({ top: -200, behavior: "smooth" });
                        } else {
                          alert("Something went wrong. Please try again.");
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Error submitting form.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#121212] mb-2 font-heading">
                        Name
                      </label>
                      <input
                        id="name" name="name" type="text" required placeholder="Your name"
                        disabled={isSubmitting}
                        defaultValue={session?.user?.name || ""}
                        readOnly={Boolean(session?.user?.name)}
                        className="w-full px-4 py-3 rounded-[14px] bg-[#F8F6F2] border border-[#E8E8E8] text-[#121212] placeholder:text-[#555555]/40 focus:outline-none focus:border-[#6F42C1] focus:ring-1 focus:ring-[#6F42C1] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed read-only:opacity-60 read-only:cursor-not-allowed"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#121212] mb-2 font-heading">
                        Email
                      </label>
                      <input
                        id="email" name="email" type="email" required placeholder="your@email.com"
                        disabled={isSubmitting}
                        defaultValue={session?.user?.email || ""}
                        readOnly={Boolean(session?.user?.email)}
                        className="w-full px-4 py-3 rounded-[14px] bg-[#F8F6F2] border border-[#E8E8E8] text-[#121212] placeholder:text-[#555555]/40 focus:outline-none focus:border-[#6F42C1] focus:ring-1 focus:ring-[#6F42C1] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed read-only:opacity-60 read-only:cursor-not-allowed"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#121212] mb-2 font-heading">
                        Phone Number
                      </label>
                      <input
                        id="phone" name="phone" type="text"
                        disabled={isSubmitting}
                        placeholder="+91 99395 80371"
                        className="w-full px-4 py-3 rounded-[14px] bg-[#F8F6F2] border border-[#E8E8E8] text-[#121212] placeholder:text-[#555555]/40 focus:outline-none focus:border-[#6F42C1] focus:ring-1 focus:ring-[#6F42C1] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[#121212] mb-2 font-heading">
                        Message
                      </label>
                      <textarea
                        id="message" name="message" required rows={4} placeholder="Tell us about your project requirements..."
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-[14px] bg-[#F8F6F2] border border-[#E8E8E8] text-[#121212] placeholder:text-[#555555]/40 focus:outline-none focus:border-[#6F42C1] focus:ring-1 focus:ring-[#6F42C1] transition-colors text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Service Selector */}
                    <div>
                      <p className="text-sm font-semibold text-[#121212] mb-3 font-heading">
                        What are you looking for?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_OPTIONS.map(service => {
                          const active = selectedService === service;
                          return (
                            <button
                              key={service}
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => setSelectedService(active ? null : service)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer ${
                                active
                                  ? "bg-[#6F42C1] text-white border-transparent shadow-sm"
                                  : "bg-[#F8F6F2] text-[#121212] border-[#E8E8E8] hover:border-[#6F42C1]/20 hover:text-[#6F42C1]"
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E8E8E8]" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-[10px] text-[#555555]/60 uppercase tracking-widest font-bold font-heading">
                          Preferred Call Meeting Slots
                        </span>
                      </div>
                    </div>

                    {/* Slot 1 */}
                    <div>
                      <p className="text-sm font-semibold text-[#121212] mb-4 font-heading">
                        <span className="text-[#6F42C1] font-extrabold mr-1">Slot 1</span>
                        <span className="text-[#555555]/60 text-xs font-medium">(Primary Choice)</span>
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <CalendarPicker
                          label="Preferred Date"
                          selected={date1}
                          onSelect={handleDate1}
                        />
                        <TimeSlotPicker
                          label="Preferred Time"
                          selectedDate={date1}
                          selectedTime={time1}
                          onSelect={setTime1}
                        />
                      </div>
                    </div>

                    {/* Slot 2 */}
                    <div>
                      <p className="text-sm font-semibold text-[#121212] mb-4 font-heading">
                        <span className="text-[#6F42C1] font-extrabold mr-1">Slot 2</span>
                        <span className="text-[#555555]/60 text-xs font-medium">(Alternative Choice)</span>
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <CalendarPicker
                          label="Alternative Date"
                          selected={date2}
                          onSelect={handleDate2}
                          afterDate={date1}
                        />
                        <TimeSlotPicker
                          label="Alternative Time"
                          selectedDate={date2}
                          selectedTime={time2}
                          onSelect={setTime2}
                        />
                      </div>
                    </div>

                    {/* Slot summary text */}
                    {(date1 || date2) && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 border border-[#E8E8E8] bg-[#F8F6F2] p-4 rounded-[14px]"
                      >
                        {date1 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E8E8E8] text-xs font-bold text-[#6F42C1]">
                            <Calendar className="h-3 w-3" />
                            Slot 1: {formatDate(date1)}{time1 ? ` @ ${time1}` : ""}
                          </span>
                        )}
                        {date2 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E8E8E8] text-xs font-bold text-[#6F42C1]">
                            <Calendar className="h-3 w-3" />
                            Slot 2: {formatDate(date2)}{time2 ? ` @ ${time2}` : ""}
                          </span>
                        )}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-base font-bold text-white rounded-[14px] btn-primary-gradient shadow-[0_4px_14px_rgba(111,66,193,0.25)] hover:shadow-[0_6px_20px_rgba(111,66,193,0.45)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5" />
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          Book My Call
                          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

      </div>

      {/* LOCAL AUTH MODAL FOR CONTACT ACTIONS */}
      <AuthModal
        open={contactAuthOpen}
        onClose={() => setContactAuthOpen(false)}
        initialMode={contactAuthMode}
      />
    </section>
  );
}
