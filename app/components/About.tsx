"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const timeline = [
    { year: "2021", event: "Wrote first production line of code. Shipped a client web app within 3 months." },
    { year: "2022", event: "First enterprise client. Delivered a nationwide EdTech platform (Pademi) to 25K+ students." },
    { year: "2023", event: "Expanded into AI systems. Built RAG pipelines, LLM integrations, and cross-border FinTech apps." },
    { year: "2024", event: "8 live production systems. $100K+ GMV processed. 25K+ users served. 98 Lighthouse." },
];

const coreStack = [
    "Next.js", "Node.js", "React Native", "TypeScript",
    "PostgreSQL", "Redis", "AWS", "Docker",
    "Python / FastAPI", "GraphQL", "Kafka", "Kubernetes",
];

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".about-reveal", { y: 50, opacity: 0 });
        ScrollTrigger.batch(".about-reveal", {
            start: "top 88%",
            onEnter: (batch) => {
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 1,
                    ease: "power4.out",
                });
            },
            once: true,
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about"
            className="px-6 md:px-16 py-32 border-t border-black/10 bg-white text-black"
            aria-label="About Mohd Sakib"
        >
            <div className="max-w-7xl mx-auto">

                {/* LABEL */}
                <p className="about-reveal text-label uppercase tracking-[0.2em] opacity-40 mb-12 font-medium">
                    About
                </p>

                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">

                    {/* LEFT — BIO */}
                    <div>
                        <h2 className="about-reveal text-heading leading-[1.05] tracking-tight mb-10 font-medium">
                            Engineer by trade.
                            <br />
                            <span className="opacity-40">Architect by instinct.</span>
                        </h2>

                        <div className="space-y-5 opacity-70 leading-relaxed about-reveal">
                            <p>
                                I&apos;m Mohd Sakib, a Senior Full Stack Developer and React Native specialist
                                based in Meerut, Uttar Pradesh. Over the past 3+ years I&apos;ve architected and
                                shipped 8 production-grade products across gaming, FinTech, EdTech, LegalTech,
                                and AI — serving 25,000+ users and processing $100K+ in transactions.
                            </p>
                            <p>
                                My core stack is Next.js, Node.js, React Native, and PostgreSQL — but I choose
                                tools based on the problem, not preference. I&apos;ve built stateless WebSocket
                                architectures with Redis pub/sub for sub-72ms real-time systems, designed
                                Kafka event-sourced microservices for PCI-DSS compliance, and engineered
                                two-stage RAG pipelines that cut hallucination rates by 45%.
                            </p>
                            <p>
                                Currently available for senior full-time roles or high-stakes freelance
                                contracts where performance and architecture quality are non-negotiable.
                            </p>
                        </div>

                        <div className="about-reveal mt-10 flex items-center gap-6">
                            <a
                                href="mailto:mohdsakib.work@gmail.com"
                                className="text-label uppercase tracking-[0.18em] font-semibold px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors duration-300"
                            >
                                Get In Touch →
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mohdsakib001"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-label uppercase tracking-[0.18em] font-medium opacity-50 hover:opacity-100 transition-opacity duration-300"
                            >
                                LinkedIn ↗
                            </a>
                        </div>
                    </div>

                    {/* RIGHT — TIMELINE + STACK */}
                    <div className="space-y-16">

                        {/* TIMELINE */}
                        <div className="about-reveal">
                            <p className="text-label uppercase tracking-[0.2em] opacity-40 mb-8">Career Timeline</p>
                            <div className="space-y-6">
                                {timeline.map((item) => (
                                    <div key={item.year} className="flex gap-6 group">
                                        <span className="text-label font-mono opacity-30 pt-1 shrink-0 group-hover:opacity-70 transition-opacity">
                                            {item.year}
                                        </span>
                                        <p className="text-caption opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity">
                                            {item.event}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CORE STACK */}
                        <div className="about-reveal">
                            <p className="text-label uppercase tracking-[0.2em] opacity-40 mb-6">Core Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {coreStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-label font-mono px-3 py-1.5 border border-black/10 opacity-60 hover:opacity-100 hover:border-black/30 transition-all duration-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* QUICK FACTS */}
                        <div className="about-reveal grid grid-cols-2 gap-4">
                            {[
                                { label: "Location", value: "Meerut, India" },
                                { label: "Experience", value: "3+ Years" },
                                { label: "Availability", value: "Immediate" },
                                { label: "Work Mode", value: "Remote / Hybrid" },
                            ].map((fact) => (
                                <div key={fact.label} className="border border-black/10 p-4">
                                    <p className="text-label uppercase tracking-[0.15em] opacity-40 mb-1">{fact.label}</p>
                                    <p className="text-caption font-medium">{fact.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
