import { lazy, Suspense } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProofStrip from "../components/ProofStrip";
import BentoWork from "../components/BentoWork";

// import Performance from "../components/Performance";
// import Capabilities from "../components/Capabilities";
// import CSSection from "../components/CsSection";
// import Hero from "../components/Hero";
// import SelectedWork from "../components/SelectedWork";
// import AISection from "../components/AiSection";
// import Faq from "../components/Faq";
// import About from "../components/About";

const Performance = lazy(() => import("../components/Performance"));
const Capabilities = lazy(() => import("../components/Capabilities"));
const CSSection = lazy(() => import("../components/CsSection"));
const Hero = lazy(() => import("../components/Hero"));
const SelectedWork = lazy(() => import("../components/SelectedWork"));
const AISection = lazy(() => import("../components/AiSection"));
const AutomationSection = lazy(() => import("../components/AutomationSection"));
const Faq = lazy(() => import("../components/Faq"));
const About = lazy(() => import("../components/About"));

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="bg-white text-black overflow-x-hidden">
        <Hero />
        <ProofStrip />

        <div id="work">
          <BentoWork />
          <Suspense fallback={<div className="h-screen" />}>
            <SelectedWork />
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-screen bg-black" />}>
          <Performance />
        </Suspense>

        <Suspense fallback={<div className="h-screen" />}>
          <Capabilities />
        </Suspense>

        <Suspense fallback={<div className="h-screen" />}>
          <AISection />
        </Suspense>

        <Suspense fallback={<div className="h-screen bg-[#0a0a0a]" />}>
          <AutomationSection />
        </Suspense>

        <Suspense fallback={null}>
          <CSSection />
        </Suspense>

        <Suspense fallback={<div className="h-screen" />}>
          <About />
        </Suspense>

        <Suspense fallback={<div className="h-screen bg-black" />}>
          <Faq />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
