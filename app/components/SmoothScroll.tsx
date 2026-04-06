"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once globally
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis();

        // 🧠 THE KEY FIX: Connect Lenis scroll position to ScrollTrigger
        // Without this, ScrollTrigger uses native scroll values while Lenis
        // uses its own interpolated values — they go out of sync and pins break.
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP ticker instead of raw rAF for better frame sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Lenis expects ms, GSAP ticker gives seconds
        });

        // Disable GSAP's internal lagSmoothing so Lenis stays in full control
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return <>{children}</>;
}