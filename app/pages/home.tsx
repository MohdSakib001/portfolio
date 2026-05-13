import { lazy, Suspense } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProofStrip from "../../components/ProofStrip";
import { TESTIMONIALS } from "@/data/testimonials";

const Performance = lazy(() => import("../../components/Performance"));
const Capabilities = lazy(() => import("../../components/Capabilities"));
const CSSection = lazy(() => import("../../components/CsSection"));
const Hero = lazy(() => import("../../components/Hero"));
const AutomationSection = lazy(
  () => import("../../components/AutomationSection"),
);
const Faq = lazy(() => import("../../components/Faq"));
const About = lazy(() => import("../../components/About"));
const BentoWork = lazy(() => import("../../components/BentoWork"));
const Testimonial = lazy(() => import("../../components/Testimonial"));

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
          <Suspense fallback={<div className="h-screen" />}>
            <BentoWork />
          </Suspense>
        </div>

        <Testimonial
          name={TESTIMONIALS[0].name}
          quote={TESTIMONIALS[0].quote}
          idx={1}
        />

        <Suspense fallback={<div className="h-screen bg-black" />}>
          <Performance />
        </Suspense>

        <Suspense fallback={<div className="h-screen" />}>
          <Capabilities />
        </Suspense>

        <Testimonial
          name={TESTIMONIALS[1].name}
          quote={TESTIMONIALS[1].quote}
          idx={2}
        />

        <Suspense fallback={<div className="h-screen bg-[#0a0a0a]" />}>
          <AutomationSection />
        </Suspense>

        <Testimonial
          name={TESTIMONIALS[2].name}
          quote={TESTIMONIALS[2].quote}
          idx={3}
        />

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
