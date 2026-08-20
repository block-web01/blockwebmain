import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeaderWrapper from "@/components/HeaderWrapper";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import BottomStrip from "@/components/BottomStrip";
import Footer from "@/components/Footer";

// ✅ Google Site Verification Meta Tag
export const metadata: Metadata = {
  verification: {
    google: "DaMg67pz8cBz-ZvJD5rcnJjaHC4is-ULJ8ZT0V03rws",
  },
};

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="h-32 bg-[#F8F6F2]" />,
});

const Reviews = dynamic(() => import("@/components/Reviews"), {
  loading: () => <div className="h-32 bg-[#F8F6F2]" />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-32 bg-[#F8F6F2]" />,
});

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HeaderWrapper />

      <main>
        {/* Hero Section (contains custom checklist & floating pricing badge) */}
        <Hero />
        
        {/* Dark Feature Strip (5 cards) */}
        <FeatureStrip />
        
        {/* Services Section (9 cards in 2-3 rows) */}
        <Services />
        
        {/* Portfolio Section (overlapping mockups) */}
        <Projects />
        
        {/* Timeline Process Section (4 steps) */}
        <Process />
        
        {/* Testimonials Section (white grid cards) */}
        <Reviews />
        
        {/* Minimal Accordion FAQ Section */}
        <FAQ />
        
        {/* Contact Form Section (two-column map + form) */}
        <Contact />
        
        {/* Bottom Black Strip with yellow CTA button */}
        <BottomStrip />
      </main>

      <Footer />
    </Suspense>
  );
}