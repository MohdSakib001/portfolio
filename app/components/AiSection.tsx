"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const workflows = [
    {
        title: "Automated Outbound Pipeline",
        desc: "Zero-touch lead generation. Handles automated scraping, deduplication against CRM state, API enrichment via Hunter.io, and drafts hyper-personalized outreach.",
        img: "/assets/ai-workflows/1.png",
        tags: ["n8n", "LinkedIn API", "Gemini", "Hunter.io"],
    },
    {
        title: "Stateful Agentic Follow-ups",
        desc: "CRON-triggered autonomous agents that read database states to identify pending actions, generating contextual sequences based on historical interaction data.",
        img: "/assets/ai-workflows/2.png",
        tags: ["State Management", "CRON", "Context Windowing"],
    },
    {
        title: "Intelligent Triage Engine",
        desc: "Real-time inbox monitoring system utilizing LLMs to classify intent, filter spam, and dynamically route queries. Features human-in-the-loop escalation.",
        img: "/assets/ai-workflows/3.png",
        tags: ["Webhooks", "Classification", "Telegram API"],
    },
    {
        title: "Autonomous Reporting",
        desc: "Scheduled data aggregation pipelines that compile weekly performance metrics, format statistical reports, and dispatch them to secure administrative channels.",
        img: "/assets/ai-workflows/4.jpeg",
        tags: ["Data Aggregation", "Analytics", "Pipeline Arch"],
    },
];

const capabilities = [
    {
        title: "LLM Integration",
        desc: "Production pipelines with streaming, tool-calling, and multi-agent orchestration.",
        tags: ["OpenAI", "Claude", "Gemini", "Vercel AI SDK"],
    },
    {
        title: "RAG Systems",
        desc: "Retrieval pipelines with semantic chunking, re-ranking, and hybrid search.",
        tags: ["LangChain", "pgvector", "Supabase", "Pinecone"],
    },
    {
        title: "Computer Vision",
        desc: "Real-time detection, pose estimation, OCR — deployed to edge for ultra-low latency.",
        tags: ["PyTorch", "YOLO", "MediaPipe", "ONNX"],
    },
    {
        title: "Fine-Tuning",
        desc: "LoRA / QLoRA tuning on custom datasets with efficient GPU utilization.",
        tags: ["HuggingFace", "PEFT", "Modal", "Axolotl"],
    },
];

export default function AISection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinWrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Text reveals
        gsap.set(".ai-reveal", { y: 60, opacity: 0 });
        ScrollTrigger.batch(".ai-reveal", {
            start: "top 85%",
            onEnter: (batch) =>
                gsap.to(batch, { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power4.out" }),
            once: true,
        });

        const mm = gsap.matchMedia();

        // Desktop: horizontal scroll
        mm.add("(min-width: 1024px)", () => {
            const panels = gsap.utils.toArray<HTMLElement>(".workflow-panel");

            gsap.to(trackRef.current, {
                x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: pinWrapRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
                    invalidateOnRefresh: true,
                },
            });
        });

        // Mobile: fade-in each card
        mm.add("(max-width: 1023px)", () => {
            gsap.utils.toArray<HTMLElement>(".workflow-panel").forEach((panel) => {
                gsap.fromTo(
                    panel,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: { trigger: panel, start: "top 85%", once: true },
                    }
                );
            });
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="bg-[#050505] text-white overflow-hidden border-t border-white/10">

            {/* HEADER */}
            <div className="px-6 md:px-16 pt-24 pb-16 lg:pt-32 lg:pb-16 max-w-4xl">
                <h2 className="text-5xl md:text-7xl tracking-tighter mb-8 ai-reveal font-semibold">
                    AI Systems & <br />
                    <span className="text-white/40">Orchestration</span>
                </h2>
                <p className="text-lg md:text-xl opacity-70 leading-relaxed ai-reveal max-w-2xl font-light">
                    Building AI-native products — from retrieval pipelines and fine-tuned models to real-time inference and zero-touch business operations.
                </p>
            </div>

            {/* WORKFLOW SHOWCASE */}
            <div
                ref={pinWrapRef}
                className="h-auto lg:h-screen flex items-center bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden"
            >
                {/* Desktop bg line */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/5 pointer-events-none" />

                {/* Track: scrolls horizontally on desktop, stacks vertically on mobile */}
                <div
                    ref={trackRef}
                    className="flex flex-col lg:flex-row h-full w-full lg:w-max will-change-transform"
                >
                    {workflows.map((wf, i) => (
                        <div
                            key={i}
                            className="workflow-panel w-full lg:w-screen h-auto lg:h-full flex flex-col lg:flex-row items-center justify-center p-6 py-16 lg:p-16 gap-10 lg:gap-16 border-b border-white/5 lg:border-none shrink-0"
                        >
                            {/* Text */}
                            <div className="w-full lg:w-1/3 shrink-0">
                                <div className="text-xs md:text-sm font-mono text-white/40 mb-4 pb-4 border-b border-white/10">
                                    0{i + 1} // ARCHITECTURE
                                </div>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-4">
                                    {wf.title}
                                </h3>
                                <p className="text-white/60 font-light leading-relaxed mb-8 text-sm md:text-base">
                                    {wf.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs font-mono">
                                    {wf.tags.map((t, j) => (
                                        <span key={j} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/70">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="w-full lg:w-2/3 max-w-5xl aspect-4/3 lg:aspect-auto lg:h-[70vh] relative group overflow-hidden border border-white/10 bg-black">
                                <div className="hidden lg:block absolute inset-0 bg-linear-to-tr from-black/40 to-transparent z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                                <Image
                                    src={wf.img}
                                    alt={wf.title}
                                    fill
                                    className="object-cover md:object-contain object-center scale-[1.02] transition-transform duration-1000 lg:group-hover:scale-100 opacity-90 lg:opacity-80 lg:mix-blend-screen lg:grayscale group-hover:grayscale-0"
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CORE CAPABILITIES */}
            <div className="px-6 md:px-16 py-24 lg:py-32">
                <h3 className="text-3xl font-semibold tracking-tight mb-12 lg:mb-16 ai-reveal pb-6 border-b border-white/10">
                    Core Capabilities
                </h3>

                <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                    {capabilities.map((cap, i) => (
                        <div key={i} className="bg-[#050505] p-8 lg:p-16 ai-reveal group hover:bg-[#0a0a0a] transition-colors">
                            <h4 className="text-xl md:text-2xl mb-4 font-medium tracking-tight text-white group-hover:text-white/90">
                                {cap.title}
                            </h4>
                            <p className="opacity-60 mb-8 font-light leading-relaxed text-sm md:text-base">
                                {cap.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs font-mono opacity-60">
                                {cap.tags.map((t, j) => (
                                    <span key={j} className="border border-white/20 px-3 py-1">{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}