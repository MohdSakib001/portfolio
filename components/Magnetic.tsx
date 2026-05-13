"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: any) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (e: any) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(ref.current, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power3.out",
        });
    };

    const handleLeave = () => {
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
        });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="inline-block"
        >
            {children}
        </div>
    );
}