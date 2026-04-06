"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Split text manually
        const text = document.querySelector(".loader-text");
        if (!text) return;

        const letters = text.innerHTML.split("");
        text.innerHTML = letters
            .map((l) => `<span class="letter inline-block">${l}</span>`)
            .join("");

        // Animate letters
        tl.from(".letter", {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            ease: "power4.out",
            duration: 0.8,
        });

        // Progress bar
        tl.to(".progress-bar", {
            width: "100%",
            duration: 1,
            ease: "power2.inOut",
        });

        // Exit animation
        tl.to(loaderRef.current, {
            y: "-100%",
            duration: 1,
            ease: "power4.inOut",
            onComplete,
        });
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 bg-black text-white z-9999 flex flex-col justify-center items-center"
        >
            {/* NAME */}
            <h1 className="loader-text text-4xl md:text-6xl tracking-wide">
                MOHD SAKIB
            </h1>

            {/* PROGRESS */}
            <div className="w-[200px] h-[2px] bg-neutral-800 mt-10 overflow-hidden">
                <div className="progress-bar h-full bg-white w-0" />
            </div>
        </div>
    );
}