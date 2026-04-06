"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AISection() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".ai-reveal", { y: 80, opacity: 0 });

        ScrollTrigger.batch(".ai-reveal", {
            start: "top 90%",
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
    }, { scope: ref });

    return (
        <section ref={ref} className="px-6 md:px-16 py-32 border-t">

            {/* HEADER */}
            <div className="max-w-3xl mb-20">
                <h2 className="text-5xl mb-6 ai-reveal">
                    AI Systems
                </h2>

                <p className="text-lg opacity-70 leading-relaxed ai-reveal">
                    Building AI-native products — from retrieval pipelines and fine-tuned
                    models to real-time inference and generative experiences.
                </p>
            </div>

            {/* CORE CAPABILITIES */}
            <div className="grid md:grid-cols-2 gap-12 mb-32">

                {/* LLM */}
                <div className="ai-reveal">
                    <h3 className="text-2xl mb-4">LLM Integration</h3>
                    <p className="opacity-70 mb-4">
                        Production pipelines with streaming, tool-calling, and multi-agent orchestration.
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm opacity-70">
                        {["OpenAI", "Claude", "Gemini", "Vercel AI SDK"].map((t, i) => (
                            <span key={i} className="border px-3 py-1">{t}</span>
                        ))}
                    </div>
                </div>

                {/* RAG */}
                <div className="ai-reveal">
                    <h3 className="text-2xl mb-4">RAG Systems</h3>
                    <p className="opacity-70 mb-4">
                        Retrieval pipelines with semantic chunking, re-ranking, and hybrid search.
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm opacity-70">
                        {["LangChain", "pgvector", "Supabase", "Pinecone"].map((t, i) => (
                            <span key={i} className="border px-3 py-1">{t}</span>
                        ))}
                    </div>
                </div>

                {/* CV */}
                <div className="ai-reveal">
                    <h3 className="text-2xl mb-4">Computer Vision</h3>
                    <p className="opacity-70 mb-4">
                        Real-time detection, pose estimation, OCR — deployed to edge for ultra-low latency.
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm opacity-70">
                        {["PyTorch", "YOLO", "MediaPipe", "ONNX"].map((t, i) => (
                            <span key={i} className="border px-3 py-1">{t}</span>
                        ))}
                    </div>
                </div>

                {/* FINETUNE */}
                <div className="ai-reveal">
                    <h3 className="text-2xl mb-4">Fine-Tuning</h3>
                    <p className="opacity-70 mb-4">
                        LoRA / QLoRA tuning on custom datasets with efficient GPU utilization.
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm opacity-70">
                        {["HuggingFace", "PEFT", "Modal", "Axolotl"].map((t, i) => (
                            <span key={i} className="border px-3 py-1">{t}</span>
                        ))}
                    </div>
                </div>

            </div>

            {/* PROFICIENCY */}
            <div className="mb-32">
                <h3 className="text-4xl mb-12 ai-reveal">AI Proficiency</h3>

                <div className="space-y-6">
                    {[
                        ["LLM Integration", 92],
                        ["Prompt Engineering", 90],
                        ["AI Services Integration", 88],
                        ["AI Product Systems", 90],
                        ["Content AI", 82],
                    ].map(([label, value], i) => (
                        <div key={i} className="ai-reveal">
                            <div className="flex justify-between text-sm mb-2">
                                <span>{label}</span>
                                <span>{value}%</span>
                            </div>

                            <div className="w-full h-[2px] bg-neutral-200">
                                <div
                                    className="h-full bg-black"
                                    style={{ width: `${value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHAT YOU BUILD */}
            <div className="mb-32">
                <h3 className="text-4xl mb-12 ai-reveal">What I Build</h3>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        "AI-powered content summarisation systems",
                        "Recommendation & personalisation engines",
                        "LLM-powered REST APIs",
                        "GenAI workflows for production",
                        "AI modules inside enterprise platforms",
                    ].map((item, i) => (
                        <div key={i} className="border p-6 ai-reveal">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* STACK TAG CLOUD */}
            <div>
                <h3 className="text-4xl mb-12 ai-reveal">Stack</h3>

                <div className="flex flex-wrap gap-4 text-sm opacity-70 ai-reveal">
                    {[
                        "GPT-4o",
                        "Claude 3.5",
                        "LangChain",
                        "Prompt Engineering",
                        "GenAI Workflows",
                        "REST AI Services",
                    ].map((t, i) => (
                        <span key={i} className="border px-4 py-2">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

        </section>
    );
}