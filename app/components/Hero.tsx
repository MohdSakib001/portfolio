"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import KineticBackground from "./KineticBackground";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-line", {
                y: 120,
                opacity: 0,
                stagger: 0.08,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.1
            });

            gsap.from(".hero-img", {
                scale: 1.2,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.1
            });
        }, containerRef);

        // ✅ RAF THROTTLE
        let rafId: number | null = null;
        let mouseX = 0;
        let mouseY = 0;

        const move = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                const x = (mouseX / window.innerWidth - 0.5) * 40;
                const y = (mouseY / window.innerHeight - 0.5) * 40;

                gsap.to(".parallax", {
                    x,
                    y,
                    duration: 0.6,
                    ease: "power3.out",
                });

                rafId = null;
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
                        fetchPriority="high"
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
        </section>
    );
}