import { lazy, Suspense } from "react";

import ProofStrip from "../ProofStrip";
import { TESTIMONIALS } from "@/data/testimonials";
import Hero from "@/components/Hero";

const Performance = lazy(() => import("../Performance"));
const Capabilities = lazy(() => import("../Capabilities"));
const CSSection = lazy(() => import("../CsSection"));
const AutomationSection = lazy(() => import("../AutomationSection"));
const Faq = lazy(() => import("../Faq"));
const BentoWork = lazy(() => import("../BentoWork"));
const Testimonial = lazy(() => import("../Testimonial"));

export default function Home() {
  return (
    <>
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

        <Suspense fallback={<div className="h-screen bg-black" />}>
          <Faq />
        </Suspense>
      </main>
    </>
  );
}
