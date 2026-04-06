"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface KineticBackgroundProps {
    words?: string[];
    className?: string;
    opacity?: number;
    color?: string;
    strokeWidth?: string;
}

export default function KineticBackground({
    words = ["DEVELOPER", "ENGINEER", "DESIGNER", "CREATOR", "THINKER"],
    className = "",
    opacity = 0.04,
    color = "black",
    strokeWidth = "2px"
}: KineticBackgroundProps) {
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".bg-text-line", {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            });

            const move = (e: MouseEvent) => {
                const { clientX } = e;
                const x = (clientX / window.innerWidth - 0.5) * 2;

                gsap.to(".bg-text-line:nth-child(odd)", { x: x * 80, duration: 1.5, ease: "power2.out" });
                gsap.to(".bg-text-line:nth-child(even)", { x: -x * 80, duration: 1.5, ease: "power2.out" });
            };

            window.addEventListener("mousemove", move);
            return () => window.removeEventListener("mousemove", move);
        }, bgTextRef);

        return () => ctx.revert();
    }, []);

    return (
        <div 
            ref={bgTextRef}
            className={`absolute inset-0 flex flex-col justify-between overflow-hidden py-8 pointer-events-none select-none ${className}`}
            style={{ opacity }}
        >
            {words.map((word, i) => (
                <div 
                    key={i} 
                    className="bg-text-line whitespace-nowrap flex will-change-transform opacity-0 translate-y-12" 
                    style={{ marginLeft: i % 2 === 0 ? '-10%' : '0%' }}
                >
                    {[...Array(8)].map((_, j) => (
                        <span 
                            key={j}
                            className="text-[15vh] leading-none font-black tracking-tighter mr-8"
                            style={{
                                WebkitTextStroke: `${strokeWidth} ${color}`,
                                color: "transparent"
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}
