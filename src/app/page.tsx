import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeaderWrapper from "@/components/HeaderWrapper";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import TrustStatement from "@/components/TrustStatement";
import Services from "@/components/Services";
import Features from "@/components/Features";

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="h-32" />,
});

const ProductsSection = dynamic(() => import("@/components/ProductsSection"), {
  loading: () => <div className="h-32" />,
});

const Founders = dynamic(() => import("@/components/Founders"), {
  loading: () => <div className="h-32" />,
});

const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="h-32" />,
});

const Reviews = dynamic(() => import("@/components/Reviews"), {
  loading: () => <div className="h-32" />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-32" />,
});

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HeaderWrapper />

      <main>
        <Hero />
        <TrustStatement />
        <Services />
        <Features />

        <ProductsSection />
        <Projects />
        <Founders />
        <Pricing />
        <Reviews />
        <Contact />
      </main>

      <Footer />
    </Suspense>
  );
}