"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { projects } from "../data/projects";
import { useRouter } from "next/navigation";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SelectedWork() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const displayProjects = projects.slice(0, 3);

    useGSAP(() => {
        const sections = gsap.utils.toArray(".project-section");

        sections.forEach((section: any) => {
            const textElements = section.querySelectorAll(".text-reveal");
            const imageWrapper = section.querySelector(".image-wrapper");
            const imageInner = section.querySelector(".image-inner");

            // 1. Smooth staggered fade-up for text as you scroll to it
            gsap.fromTo(
                textElements,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%", // Triggers when the top of the section hits 75% down the viewport
                        toggleActions: "play none none none", // Plays once
                    },
                }
            );

            // 2. Premium "Expanding Clip-Path" parallax effect for the image
            if (imageWrapper && imageInner) {
                gsap.fromTo(
                    imageInner,
                    {
                        clipPath: "inset(15% 15% 15% 15% round 24px)",
                        scale: 1.1
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0% round 0px)",
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: imageWrapper,
                            start: "top bottom",
                            end: "center center",
                            scrub: true, // Smoothly animates tied to your scrollbar
                        },
                    }
                );
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-white text-black overflow-hidden">
            {displayProjects.map((project, i) => {
                // Alternating layout for Desktop
                const isEven = i % 2 === 0;

                return (
                    <section
                        key={project.id}
                        // Mobile: flex-col (Text 100vh -> Image 100vh)
                        // Desktop: flex-row (Both share 100vh side-by-side), alternating direction
                        className={`project-section flex flex-col md:h-svh w-full border-b border-black/5 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* 
                            TEXT HALF
                            Mobile: 1 full screen (min-h-100svh)
                            Desktop: 50% width sharing the 100svh parent
                        */}
                        <div className="w-full md:w-1/2 min-h-svh md:min-h-0 flex flex-col justify-center px-8 py-16 md:p-16 lg:p-24 bg-white z-10">
                            <div className="max-w-xl mx-auto md:mx-0 w-full">
                                <p className="text-reveal text-xs uppercase tracking-[0.2em] opacity-50 mb-6 font-bold">
                                    {project.category}
                                </p>

                                <h2 className="text-reveal text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6 font-medium">
                                    {project.name}
                                </h2>

                                <p className="text-reveal text-lg opacity-70 mb-10 md:max-w-md leading-relaxed">
                                    {project.tagline}
                                </p>

                                <div className="text-reveal flex flex-wrap gap-2 mb-12">
                                    {Object.entries(project.metrics).map(([key, val]) => (
                                        <span
                                            key={key}
                                            className="text-xs font-semibold border border-black/10 px-4 py-2 tracking-wide uppercase rounded-full bg-neutral-50"
                                        >
                                            {val as string}
                                        </span>
                                    ))}
                                </div>

                                {/* Re-structured Minimal Buttons */}
                                <div className="text-reveal flex flex-col items-start gap-8">
                                    <Magnetic>
                                        <button
                                            onClick={() => router.push(`/projects#${project.id}`)}
                                            className="group flex items-center justify-center gap-4 px-8 py-4 bg-black text-white rounded-full text-sm font-semibold uppercase tracking-widest hover:scale-105 transition active:scale-95 shadow-xl hover:shadow-black/40"
                                        >
                                            <span>Explore Details</span>
                                            <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                                        </button>
                                    </Magnetic>

                                    {/* Secondary minimal links grouping */}
                                    <div className="flex flex-wrap items-center gap-5">
                                        {project.links?.appstore && project.links.appstore !== '#' && (
                                            <a href={project.links.appstore} target="_blank" rel="noreferrer" className="hover:opacity-75 transition">
                                                <Image src="/assets/appstore.webp" alt="App Store" width={110} height={36} className="h-9 w-auto object-contain" />
                                            </a>
                                        )}
                                        {project.links?.playstore && project.links.playstore !== '#' && (
                                            <a href={project.links.playstore} target="_blank" rel="noreferrer" className="hover:opacity-75 transition">
                                                <Image src="/assets/playstore.webp" alt="Play Store" width={110} height={36} className="h-9 w-auto object-contain" />
                                            </a>
                                        )}
                                        {project.links?.webapp && project.links.webapp !== '#' && (
                                            <a href={project.links.webapp} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-black transition flex items-center gap-1.5 opacity-60 hover:opacity-100 pb-0.5">
                                                Web App <span className="text-base leading-none">↗</span>
                                            </a>
                                        )}
                                        {project.links?.website && project.links.website !== '#' && (
                                            <a href={project.links.website} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-black transition flex items-center gap-1.5 opacity-60 hover:opacity-100 pb-0.5">
                                                Visit Website <span className="text-base leading-none">↗</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 
                            IMAGE HALF 
                            Mobile: 1 full screen (h-100svh) below the text
                            Desktop: 50% width sharing the 100svh parent
                        */}
                        <div className="image-wrapper w-full md:w-1/2 h-svh md:h-full relative bg-[#f7f7f7] overflow-hidden p-6 md:p-10">
                            <div className="image-inner w-full h-full relative origin-center">
                                {project.hero.type === "image" ? (
                                    <Image
                                        src={project.hero.src}
                                        alt={project.name}
                                        fill
                                        className="object-contain"
                                        priority={i === 0}
                                        loading={i === 0 ? "eager" : "lazy"}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <video
                                        src={project.hero.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* ENDING CTA SECTION */}
            <section className="project-section relative min-h-[90svh] w-full bg-neutral-950 text-white flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden">
                {/* Background Pattern */}
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.02] flex flex-wrap gap-4 overflow-hidden pointer-events-none p-4 select-none">
                    {Array.from({ length: 40 }).map((_, idx) => (
                        <span key={idx} className="text-4xl md:text-6xl font-black italic whitespace-nowrap">FULL-STACK ENGINEER</span>
                    ))}
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
                    <p className="text-reveal text-sm uppercase tracking-[0.2em] opacity-60 mb-6 font-semibold text-neutral-400">
                        Archive & More
                    </p>
                    <h1 className="text-reveal text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-white/40 mb-8 leading-[0.9]">
                        SEE ALL<br />WORK.
                    </h1>
                    <p className="text-reveal text-lg md:text-xl opacity-60 mb-12">
                        Dive deep into all my enterprise, startup, and full-stack engineering side projects.
                    </p>

                    <div className="text-reveal">
                        <Magnetic>
                            <button
                                onClick={() => router.push(`/projects`)}
                                className="group flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-full w-max shadow-xl hover:shadow-white/20 transition hover:-translate-y-1 text-sm tracking-widest uppercase font-bold"
                            >
                                <span>Explore All Projects</span>
                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </section>
        </div>
    );
}