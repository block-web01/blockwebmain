"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Block Web offer?",
    answer:
      "Block Web offers a full suite of web design and development services, including Custom Business Websites, Portfolio Websites, Landing Pages, E-commerce Platforms, Custom Web Applications, UI/UX Design, Website Redesigns, SEO Optimization, and ongoing Website Maintenance.",
  },
  {
    question: "How much do your website development services cost?",
    answer:
      "Our project pricing is custom-scoped based on requirements, complexity, and timelines. We maintain transparent pricing with no hidden charges. Our core business websites start at $199.",
  },
  {
    question: "How long does it take to deliver a custom website?",
    answer:
      "Our standard delivery timeline is exactly 12 days for custom-designed, responsive, and SEO-optimized sites. For complex web applications or larger e-commerce stores, timeline details are scoped during discovery.",
  },
  {
    question: "Does Block Web provide hosting and domain registration?",
    answer:
      "Yes! All our standard website packages include free domain registration and high-performance secure hosting services for the first year, including free SSL certificates.",
  },
  {
    question: "What technologies does Block Web use?",
    answer:
      "We build clean, custom-coded web architectures using Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion to ensure exceptional performance, responsiveness, and modern aesthetics.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#F8F6F2]">
      <div className="section-container max-w-[800px]">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block mb-3 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6F42C1] border border-[#6F42C1]/20 rounded-full bg-[#6F42C1]/5"
          >
            Curious Minds
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121212] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#555555] text-base">
            Everything you need to know about our services and process.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="border-t border-[#E8E8E8] divide-y divide-[#E8E8E8]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between text-left py-2 font-heading font-extrabold text-base sm:text-lg text-[#121212] hover:text-[#6F42C1] transition-colors focus:outline-none cursor-pointer group"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#555555] group-hover:text-[#6F42C1] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm sm:text-base text-[#555555] leading-relaxed pt-2.5 pb-2">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
