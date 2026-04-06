import AISection from "../components/AiSection";
import Capabilities from "../components/Capabilities";
import CSSection from "../components/CsSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Performance from "../components/Performance";
import ProofStrip from "../components/ProofStrip";
import SelectedWork from "../components/SelectedWork";

export default function Home() {

    return (
        <>
            <Header />
            <main className="bg-white text-black overflow-x-hidden">
                <Hero />
                <ProofStrip />
                <SelectedWork />
                <Performance />
                <Capabilities />
                <AISection />
                <CSSection />
                <Footer />
            </main>
        </>
    );
}
