import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const TrustStatement = dynamic(() => import("@/components/TrustStatement"));
const Services = dynamic(() => import("@/components/Services"));
const Features = dynamic(() => import("@/components/Features"));
const Founders = dynamic(() => import("@/components/Founders"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStatement />
        <Services />
        <Features />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
