import { Suspense } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProofStrip from "../components/ProofStrip";
import Performance from "../components/Performance";
import Capabilities from "../components/Capabilities";
import CSSection from "../components/CsSection";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import AISection from "../components/AiSection";
import Faq from "../components/Faq";

export default function Home() {
    return (
        <>
            <Header />

            <main className="bg-white text-black overflow-x-hidden">
                <Hero />

                <Suspense fallback={null}>
                    <ProofStrip />
                </Suspense>

                <Suspense fallback={<div className="h-screen" />}>
                    <SelectedWork />
                </Suspense>

                <Suspense fallback={<div className="h-screen bg-black" />}>
                    <Performance />
                </Suspense>

                <Suspense fallback={<div className="h-screen" />}>
                    <Capabilities />
                </Suspense>

                <Suspense fallback={<div className="h-screen" />}>
                    <AISection />
                </Suspense>

                <Suspense fallback={null}>
                    <CSSection />
                </Suspense>

                <Suspense fallback={<div className="h-screen bg-black" />}>
                    <Faq />
                </Suspense>
            </main>

            <Footer />
        </>
    );
}