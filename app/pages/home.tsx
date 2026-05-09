import { lazy, Suspense } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProofStrip from "../components/ProofStrip";
import BentoWork from "../components/BentoWork";
import Testimonial from "../components/Testimonial";

const TESTIMONIALS = [
  {
    id: "adam",
    name: "Adam",
    company: "Stakeclash",
    quote:
      "Working with Sakib on Stakeclash was a game changer. He turned a complex staking interface into something our users actually enjoy — the speed and attention to detail were unlike anything I'd experienced.",
  },
  {
    id: "oniya",
    name: "Oniya",
    company: "Pademi & Tekish Health",
    quote:
      "Sakib brought clarity to two very different products at once. Both Pademi and Tekish Health launched on time with zero compromises on the experience. He just gets it.",
  },
  {
    id: "chiddy",
    name: "Chiddy",
    company: "Colaw",
    quote:
      "Colaw needed someone who could handle legal complexity without losing sight of the user. Sakib delivered exactly that — a clean, intuitive product that our clients and team both love.",
  },
  {
    id: "krapton",
    name: "Krapton",
    company: "Techsleight",
    quote:
      "The bar Sakib sets for product quality is exceptional. Techsleight looks and works exactly as we envisioned it, and the process was seamless from start to finish.",
  },
];

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

        <Testimonial name={TESTIMONIALS[0].name} quote={TESTIMONIALS[0].quote} />

        <Suspense fallback={<div className="h-screen bg-black" />}>
          <Performance />
        </Suspense>

        <Suspense fallback={<div className="h-screen" />}>
          <Capabilities />
        </Suspense>

        <Testimonial name={TESTIMONIALS[1].name} quote={TESTIMONIALS[1].quote} />

        <Suspense fallback={<div className="h-screen" />}>
          <AISection />
        </Suspense>

        <Suspense fallback={<div className="h-screen bg-[#0a0a0a]" />}>
          <AutomationSection />
        </Suspense>

        <Testimonial name={TESTIMONIALS[2].name} quote={TESTIMONIALS[2].quote} />

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
