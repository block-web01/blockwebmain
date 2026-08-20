"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "VG",
    name: "Vishwas Girdher",
    source: "Google Review",
    rating: 5,
    text: "Block Web is literally the best team out there. They are extremely clear on communication, super adaptive, and highly committed to their deadlines. Highly recommended!",
  },
  {
    initials: "AK",
    name: "Amol Kulkarni",
    source: "Google Review",
    rating: 5,
    text: "Excellent work quality and a very professional team. Block Web delivered our website much faster than expected (exactly 12 days!) with great attention to detail. Will definitely work with them again.",
  },
  {
    initials: "RS",
    name: "Rahul Sharma",
    source: "Google Review",
    rating: 5,
    text: "Block Web helped us build a complete brand identity from scratch. The logo, corporate colors, and conversion-focused web design came together beautifully. Their creative vision is top-tier.",
  },
  {
    initials: "PM",
    name: "Priya Mehta",
    source: "Google Review",
    rating: 5,
    text: "We hired Block Web as our development partner and it was the best decision we made. Our clients love the output and the speed of execution is unmatched. True professionals.",
  },
  {
    initials: "SK",
    name: "Saurabh Kale",
    source: "Google Review",
    rating: 5,
    text: "Got my website designed and deployed in just 12 days. The speed was incredible, but the quality of the UI/UX was even more impressive. SEO optimized, fast loading, and pixel-perfect.",
  },
  {
    initials: "NK",
    name: "Neha Kapoor",
    source: "Google Review",
    rating: 5,
    text: "Very responsive team and their project management was seamless. They kept us in the loop at every stage of the design. The final product exceeded our expectations in both style and functionality.",
  },
];

export default function Reviews() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="reviews" className="relative py-24 bg-[#F8F6F2]">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="block mb-3 text-xs font-extrabold uppercase tracking-widest text-[#6F42C1] font-heading"
          >
            Word on the Street
          </motion.span>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121212] mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 text-xs font-bold text-[#555555]"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-[#F7B500] fill-[#F7B500]" />
              ))}
            </div>
            <span>5.0 rating on Google &bull; Verified Clients</span>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, pointerEvents: "none" }}
              whileInView={{ opacity: 1, y: 0, pointerEvents: "auto" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 + (idx * 0.05), ease: "easeOut" }}
              whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="bg-white border border-[#E8E8E8] rounded-[18px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-[box-shadow] duration-300 ease-out flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#F7B500] fill-[#F7B500]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#555555] leading-relaxed mb-6 italic">
                  "{test.text}"
                </p>
              </div>

              {/* Author Section */}
              <div className="flex items-center gap-3 border-t border-[#E8E8E8] pt-4 mt-auto">
                {/* Circular Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#6F42C1]/10 text-[#6F42C1] border border-[#6F42C1]/20 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {test.initials}
                </div>
                <div>
                  <h4 className="text-sm font-heading font-extrabold text-[#121212]">
                    {test.name}
                  </h4>
                  <span className="text-[10px] font-bold text-[#555555]">
                    {test.source}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}