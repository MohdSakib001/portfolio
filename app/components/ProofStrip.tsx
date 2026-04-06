"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
    { label: "MAU", value: 18000, suffix: "+" },
    { label: "Revenue", value: 6000, prefix: "$", suffix: "/mo" },
    { label: "Performance", value: 98, suffix: " Lighthouse" },
    { label: "Concurrent Users", value: 5000, suffix: "+" },
];

export default function ProofStrip() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const numbers = ref.current?.querySelectorAll(".count");

        numbers?.forEach((el: any) => {
            const target = +el.getAttribute("data-target");

            gsap.fromTo(
                el,
                { innerText: 0 },
                {
                    innerText: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 80%",
                    },
                    onUpdate: function () {
                        el.innerText = Math.floor(el.innerText);
                    },
                }
            );
        });
    }, []);

    return (
        <section
            ref={ref}
            className="border-y border-neutral-200 py-16 px-6 md:px-16"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {stats.map((s, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="text-3xl md:text-4xl font-semibold tracking-tight">
                            {s.prefix || ""}
                            <span className="count" data-target={s.value}>
                                0
                            </span>
                            {s.suffix || ""}
                        </div>
                        <p className="text-sm opacity-60">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}