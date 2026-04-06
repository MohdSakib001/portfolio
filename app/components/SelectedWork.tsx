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
    const totalFrames = displayProjects.length + 1;

    useGSAP(() => {
        // Master timeline pinned to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (totalFrames - 1),
                end: () => "+=" + window.innerHeight * totalFrames,
                invalidateOnRefresh: true,
            },
        });

        // For each project transition (except the first which is visible by default)
        displayProjects.forEach((_, i) => {
            if (i === 0) return;

            // Image clip-path wipe reveal
            tl.fromTo(
                `.work-img-${i}`,
                { clipPath: "inset(0% 0% 100% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" },
                i - 0.5
            );

            // Previous content fades out
            tl.to(
                `.work-content-${i - 1}`,
                { y: -60, opacity: 0, duration: 0.5, ease: "power2.in" },
                i - 0.5
            );

            // New content slides in
            tl.fromTo(
                `.work-content-${i}`,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
                i
            );
        });

        // The View All frame transition (index = 3)
        const ctaIndex = 3;

        tl.fromTo(
            `.work-img-${ctaIndex}`,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" },
            ctaIndex - 0.5
        );

        tl.to(
            `.work-content-${ctaIndex - 1}`,
            { y: -60, opacity: 0, duration: 0.5, ease: "power2.in" },
            ctaIndex - 0.5
        );

        tl.fromTo(
            `.work-content-${ctaIndex}`,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            ctaIndex
        );

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-white text-black"
        >
            {/* FIXED LAYOUT — Split screen */}
            <div className="h-screen flex">

                {/* LEFT — EDITORIAL TEXT SIDE */}
                <div className="w-full md:w-[45%] h-full flex flex-col justify-between p-8 md:p-16 relative z-10">

                    {/* MIDDLE: Stacked project content (only one visible at a time) */}
                    <div className="relative flex-1 flex items-center">
                        {displayProjects.map((project, i) => (
                            <div
                                key={project.id}
                                className={`work-content-${i} absolute inset-0 flex flex-col justify-center ${i > 0 ? "opacity-0 pointer-events-none" : ""}`}
                            >
                                {/* Category pill */}
                                <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-6 font-semibold">
                                    {project.category}
                                </p>

                                {/* Project name — BIG */}
                                <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-6 font-medium">
                                    {project.name}
                                </h2>

                                {/* Tagline */}
                                <p className="text-lg md:text-xl opacity-60 mb-10 max-w-md">
                                    {project.tagline}
                                </p>

                                {/* Metrics strip */}
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {Object.entries(project.metrics).map(([key, val]) => (
                                        <span
                                            key={key}
                                            className="text-xs border border-neutral-300 px-3 py-1.5 tracking-wide uppercase"
                                        >
                                            {val as string}
                                        </span>
                                    ))}
                                </div>

                                {/* Interactive CTA Row */}
                                <Magnetic>
                                    <button
                                        onClick={() => router.push(`/projects#${project.id}`)}
                                        className="flex items-center gap-3 px-8 py-3.5 bg-black text-white rounded-full text-sm font-semibold uppercase tracking-widest hover:scale-105 transition active:scale-95 shadow-2xl hover:shadow-black/50 hover:cursor-pointer"
                                    >
                                        <span>Explore Details</span>
                                        <span className="text-lg leading-none transition-transform group-hover/btn:translate-x-1">→</span>
                                    </button>
                                </Magnetic>
                                <div className="flex flex-wrap items-center gap-4 mt-6 pointer-events-auto">

                                    {project.links && project.links.appstore && project.links.appstore !== '#' && (
                                        <a href={project.links.appstore} target="_blank" rel="noreferrer" className="hover:scale-105 transition active:scale-95">
                                            <Image
                                                src="/assets/appstore.png"
                                                alt="Download on the App Store"
                                                width={140}
                                                height={44}
                                                className="h-[2.8rem] w-auto object-contain drop-shadow-md"
                                            />
                                        </a>
                                    )}

                                    {project.links && project.links.playstore && project.links.playstore !== '#' && (
                                        <a href={project.links.playstore} target="_blank" rel="noreferrer" className="hover:scale-105 transition active:scale-95">
                                            <Image
                                                src="/assets/playstore.png"
                                                alt="Get it on Google Play"
                                                width={140}
                                                height={44}
                                                className="h-[2.8rem] w-auto object-contain drop-shadow-md"
                                            />
                                        </a>
                                    )}

                                    {project.links && project.links.webapp && project.links.webapp !== '#' && (
                                        <a href={project.links.webapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-black/10 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-black/5 hover:border-black/30 transition">
                                            <span>Web App</span>
                                            <span className="text-lg leading-none">↗</span>
                                        </a>
                                    )}

                                    {project.links && project.links.website && project.links.website !== '#' && (
                                        <a href={project.links.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-black/10 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-black/5 hover:border-black/30 transition">
                                            <span>Visit Website</span>
                                            <span className="text-lg leading-none">↗</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* CTA FRAME VIEW ALL CONTENT */}
                        <div className={`work-content-3 absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none`}>
                            <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-6 font-semibold text-neutral-500">
                                Archive & More
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight mb-6 max-w-sm font-medium">
                                View Full Project Archive.
                            </h2>
                            <p className="text-lg md:text-xl opacity-60 mb-10 max-w-md">
                                Dive deep into all my enterprise, startup, and full-stack engineering side projects.
                            </p>
                            <Magnetic>
                                <button
                                    onClick={() => router.push(`/projects`)}
                                    className="text-sm tracking-widest uppercase font-semibold group/btn flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-full w-max mt-4 pointer-events-auto shadow-xl hover:shadow-2xl transition hover:-translate-y-1"
                                >
                                    <span>Explore All Projects</span>
                                    <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                                </button>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                {/* RIGHT — IMAGE STACK (clip-path reveals) */}
                <div className="hidden md:block w-[55%] h-full relative">
                    {displayProjects.map((project, i) => (
                        <div
                            key={project.id}
                            className={`work-img-${i} absolute inset-0 bg-[#f7f7f7]`}
                            style={{
                                zIndex: i + 1,
                                clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                            }}
                        >
                            {project.hero.type === "image" ? (
                                <Image
                                    src={project.hero.src}
                                    alt={project.name}
                                    fill
                                    className="object-contain p-12"
                                    priority={i === 0}
                                    loading={i === 0 ? "eager" : "lazy"}
                                    sizes="(max-width: 768px) 100vw, 55vw"
                                />
                            ) : (
                                <video
                                    src={project.hero.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent" />
                        </div>
                    ))}

                    {/* CTA FRAME VIEW ALL IMAGE */}
                    <div
                        className={`work-img-3 absolute inset-0 bg-neutral-900 text-white flex flex-col items-center justify-center p-12`}
                        style={{
                            zIndex: 4,
                            clipPath: "inset(0% 0% 100% 0%)",
                        }}
                    >
                        {/* Interactive huge text background or pattern */}
                        <div className="absolute inset-0 opacity-[0.03] flex flex-wrap gap-4 overflow-hidden pointer-events-none p-4 select-none">
                            {Array.from({ length: 100 }).map((_, i) => (
                                <span key={i} className="text-5xl font-black italic whitespace-nowrap">FULL-STACK ENGINEER</span>
                            ))}
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-center z-10 uppercase tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-white/40">
                            SEE ALl<br />WORK.
                        </h1>
                    </div>
                </div>

                {/* MOBILE: Show current project image below text on small screens */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 h-[35vh]">
                    {displayProjects.map((project, i) => (
                        <div
                            key={project.id}
                            className={`work-img-${i} absolute inset-0 bg-[#f7f7f7]`}
                            style={{
                                zIndex: i + 1,
                                clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                            }}
                        >
                            <Image
                                src={project.hero.src}
                                alt={project.name}
                                fill
                                className="object-cover"
                                priority={i === 0}
                                loading={i === 0 ? "eager" : "lazy"}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-white to-transparent" />
                        </div>
                    ))}

                    <div
                        className={`work-img-3 absolute inset-0 bg-neutral-900 grid place-items-center`}
                        style={{
                            zIndex: 4,
                            clipPath: "inset(0% 0% 100% 0%)",
                        }}
                    >
                        <h1 className="text-5xl font-black text-white text-center uppercase tracking-tighter">
                            SEE ALL<br />WORK.
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}