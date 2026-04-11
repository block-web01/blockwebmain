"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Review = {
  id: number;
  name: string;
  role: string;
  image: string;
  review: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Bardia Adibi",
    role: "Product Designer @ BA Studio",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Using this platform has completely transformed how we approach product design. The intuitive interface and versatile features have allowed us to create an engaging user experience with ease.",
  },
  {
    id: 2,
    name: "Sophia Carter",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "An absolute game changer. The workflow is smooth, and performance is unmatched.",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    review:
      "Clean architecture, beautiful UI, and blazing fast performance.",
  },
  {
    id: 4,
    name: "Emily Stone",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Improved our workflow and team collaboration drastically.",
  },
  {
    id: 5,
    name: "Rahul Verma",
    role: "Backend Engineer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    review:
      "Scalable and robust. Everything just works perfectly.",
  },
  {
    id: 6,
    name: "Olivia Brown",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    review:
      "We launched faster than ever before using this platform.",
  },
];

export default function Reviews() {
  const [active, setActive] = useState(reviews[0]);

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* 🔥 TAG */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-[#8b5cf6]/30 text-[#8b5cf6] bg-[#8b5cf6]/10 backdrop-blur-md">
            Review
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center tracking-tight">
          Feedback from Our Community
        </h2>

        <p className="text-[#bdb7c8]/70 text-center mt-3 text-sm md:text-base">
          Real experiences from our users
        </p>

        {/* Layout */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">

          {/* 👤 Avatar Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
            {reviews.map((user) => (
              <motion.div
                key={user.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActive(user)}
                className={`cursor-pointer rounded-xl p-[2px] transition-all ${
                  active.id === user.id
                    ? "bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6]"
                    : "bg-transparent"
                }`}
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl transition-all ${
                    active.id === user.id
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* 💬 Review Card */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:flex-1 bg-[#140d1f] border border-[rgba(124,58,237,0.2)] rounded-2xl p-5 sm:p-6 shadow-[0_0_40px_rgba(124,58,237,0.2)]"
          >
            {/* Name */}
            <div className="mb-3">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {active.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#bdb7c8]">
                {active.role}
              </p>
            </div>

            {/* Review */}
            <p className="text-sm sm:text-base text-[#d1cfe0] leading-relaxed">
              “{active.review}”
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}