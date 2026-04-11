import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

/* ✅ SAFE dynamic imports (NO ssr:false) */
const TrustStatement = dynamic(() => import("@/components/TrustStatement"), {
  loading: () => <div className="h-32" />,
});

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="h-32" />,
});

const Features = dynamic(() => import("@/components/Features"), {
  loading: () => <div className="h-32" />,
});

const Projects = dynamic(() => import("@/components/Projects"), {
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
    <>
      <Header />

      <main>
        {/* ✅ Only Hero loads instantly */}
        <Hero />

        {/* ✅ Others load progressively */}
        <TrustStatement />
        <Services />
        <Features />
        <Projects />
        <Founders />
        <Pricing />
        <Reviews />
        <Contact />
      </main>

      <Footer />
    </>
  );
}