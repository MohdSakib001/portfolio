"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import KineticBackground from "./KineticBackground";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // TEXT REVEAL
            gsap.from(".hero-line", {
                y: 120,
                opacity: 0,
                stagger: 0.08,
                duration: 1.2,
                ease: "power4.out",
                delay: 2.2
            });

            // IMAGE FLOAT
            gsap.from(".hero-img", {
                scale: 1.2,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 2.3
            });
        }, containerRef);

        // PARALLAX
        const move = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;

            gsap.to(".parallax", {
                x,
                y,
                duration: 1,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", move);

        return () => {
            ctx.revert();
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-white text-black"
        >
            {/* KINETIC TYPOGRAPHY BACKGROUND */}
            <KineticBackground opacity={0.04} strokeWidth="2px" color="black" />

            {/* IMAGE LAYER */}
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                <div className="relative w-[280px] md:w-[420px] aspect-3/4 hero-img parallax pointer-events-auto">
                    <Image
                        src="/assets/me/1.png"
                        alt="me"
                        fill
                        className="object-cover grayscale contrast-125"
                        priority
                    />
                </div>
            </div>

            {/* TEXT */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 pointer-events-none">
                <h1 className="text-[14vw] leading-none tracking-[-0.06em] font-semibold">
                    <span className="block hero-line">MOHD</span>
                    <span className="block hero-line">SAKIB</span>
                </h1>

                <p className="mt-6 text-sm md:text-base max-w-xs opacity-70 hero-line">
                    Builds products that scale, perform and actually convert.
                </p>
            </div>

            {/* NOISE */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('/assets/noise.png')]" />
        </section>
    );
}