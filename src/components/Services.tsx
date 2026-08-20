"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  User,
  FileCode,
  ShoppingBag,
  Code2,
  Palette,
  RefreshCw,
  Search,
  Settings,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    title: "Business Websites",
    desc: "Professional, high-conversion websites tailored for companies and local businesses to establish credibility.",
    icon: Briefcase,
  },
  {
    title: "Portfolio Websites",
    desc: "Stunning, visual-first portfolios designed for creators, doctors, coaches, and professionals.",
    icon: User,
  },
  {
    title: "Landing Pages",
    desc: "Single-page campaign sites built for maximum conversion, lead capture, and product launches.",
    icon: FileCode,
  },
  {
    title: "E-commerce",
    desc: "Full-featured online stores with secure checkout, payment gateway integrations, and product management.",
    icon: ShoppingBag,
  },
  {
    title: "Web Applications",
    desc: "Custom, interactive portal dashboards and SaaS web apps engineered for performance and scalability.",
    icon: Code2,
  },
  {
    title: "UI/UX Design",
    desc: "Premium, modern interface designs focused on outstanding user experience, clean layout, and structure.",
    icon: Palette,
  },
  {
    title: "Website Redesign",
    desc: "Complete overhaul of your legacy site to improve aesthetics, speed, performance, and conversion rates.",
    icon: RefreshCw,
  },
  {
    title: "SEO Optimisation",
    desc: "Deep structure and copy optimization to boost organic rankings, indexing speed, and search visibility.",
    icon: Search,
  },
  {
    title: "Website Maintenance",
    desc: "Ongoing technical support, regular security updates, server backups, and continuous optimizations.",
    icon: Settings,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#F8F6F2]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block mb-3 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6F42C1] border border-[#6F42C1]/20 rounded-full bg-[#6F42C1]/5"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#121212] mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-[#555555] text-base sm:text-lg leading-relaxed"
          >
            We deliver production-ready, custom-coded web solutions crafted with visual excellence and conversion-focused structures.
          </motion.p>
        </div>

        {/* Services Grid (3 columns on desktop, 9 items total) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white border border-[#E8E8E8] rounded-[18px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Purple Circle Icon */}
                  <div className="w-12 h-12 rounded-[14px] bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] mb-6 border border-[#6F42C1]/20 transition-colors group-hover:bg-[#6F42C1] group-hover:text-white">
                    <Icon size={20} className="stroke-[2.2]" />
                  </div>
                  
                  <h3 className="text-xl font-heading font-extrabold text-[#121212] mb-3 group-hover:text-[#6F42C1] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#6F42C1] cursor-pointer mt-auto">
                  <span>Learn More</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
