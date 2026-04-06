"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const currentYear = new Date().getFullYear();

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Reveal animation
        gsap.set(".footer-reveal", { y: 60, opacity: 0 });
        ScrollTrigger.batch(".footer-reveal", {
            start: "top 92%",
            onEnter: (batch) => {
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.06,
                    duration: 1,
                    ease: "power4.out",
                });
            },
            once: true,
        });

        // Infinite marquee
        if (marqueeRef.current) {
            const marqueeInner = marqueeRef.current.querySelector(".marquee-track");
            if (marqueeInner) {
                gsap.to(marqueeInner, {
                    xPercent: -50,
                    duration: 20,
                    ease: "none",
                    repeat: -1,
                });
            }
        }
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} id="contact" className="bg-black text-white relative overflow-hidden">

            {/* CTA MARQUEE — massive repeating text */}
            <div ref={marqueeRef} className="py-16 md:py-24 overflow-hidden border-b border-white/10">
                <div className="marquee-track flex whitespace-nowrap w-max">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <span
                            key={i}
                            className="text-6xl md:text-8xl lg:text-[10vw] font-light tracking-tight mx-8 opacity-20 select-none"
                        >
                            Let&apos;s work together •
                        </span>
                    ))}
                </div>
            </div>

            {/* MAIN FOOTER CONTENT */}
            <div className="px-6 md:px-16 py-20 md:py-32">

                {/* TOP ROW — Big CTA text + email */}
                <div className="grid md:grid-cols-2 gap-16 mb-24">
                    <div>
                        <h2 className="text-4xl md:text-6xl leading-[1.1] tracking-tight footer-reveal">
                            Got a project?
                            <br />
                            <span className="opacity-40">Let&apos;s talk.</span>
                        </h2>
                    </div>

                    <div className="flex flex-col justify-end footer-reveal">
                        <p className="text-xs uppercase tracking-[0.2em] opacity-30 mb-4">
                            Reach out
                        </p>
                        <Magnetic>
                            <a
                                href="mailto:mohdsakib.work@gmail.com"
                                className="text-xl md:text-2xl underline underline-offset-8 decoration-white/30 hover:decoration-white transition-all duration-500"
                            >
                                mohdsakib.work@gmail.com
                            </a>
                        </Magnetic>
                    </div>
                </div>

                {/* MIDDLE — Links grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">

                    {/* Navigation */}
                    <div className="footer-reveal">
                        <p className="text-xs uppercase tracking-[0.2em] opacity-30 mb-6">
                            Navigation
                        </p>
                        <div className="flex flex-col gap-3">
                            {["Home", "Work", "About", "Contact"].map((item) => (
                                <Magnetic key={item}>
                                    <a
                                        href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                                        className="text-sm opacity-60 hover:opacity-100 transition-opacity duration-300"
                                    >
                                        {item}
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="footer-reveal">
                        <p className="text-xs uppercase tracking-[0.2em] opacity-30 mb-6">
                            Socials
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: "GitHub", url: "https://github.com/mohdsakib-Krapton" },
                                { label: "LinkedIn", url: "https://linkedin.com/in/mohdsakib001" },
                                { label: "Twitter", url: "https://twitter.com/mohdsakib001" },
                            ].map((s) => (
                                <Magnetic key={s.label}>
                                    <a
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener"
                                        className="text-sm opacity-60 hover:opacity-100 transition-opacity duration-300"
                                    >
                                        {s.label} ↗
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="footer-reveal">
                        <p className="text-xs uppercase tracking-[0.2em] opacity-30 mb-6">
                            Services
                        </p>
                        <div className="flex flex-col gap-3 text-sm opacity-60">
                            <span>Full-Stack Dev</span>
                            <span>React Native</span>
                            <span>System Design</span>
                            <span>AI Integration</span>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="footer-reveal">
                        <p className="text-xs uppercase tracking-[0.2em] opacity-30 mb-6">
                            Status
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm opacity-80">Available for work</span>
                        </div>
                        <p className="text-sm opacity-40">
                            Open to freelance, full-time,
                            <br />
                            and collaboration.
                        </p>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs opacity-30 footer-reveal">
                        © {currentYear} Mohd Sakib. Built from scratch.
                    </p>

                    <div className="flex items-center gap-6 footer-reveal">
                        <span className="text-xs opacity-20">
                            Next.js • GSAP • Lenis
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
