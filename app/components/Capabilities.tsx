"use client";

import Image from "next/image";
import { tech, aiTech } from "../data/technologies";

export default function Capabilities() {
    return (
        <section className="py-32 px-6 md:px-16 border-t overflow-hidden">
            <h2 className="text-5xl mb-16">Capabilities</h2>
            <div className="relative overflow-hidden mb-24 space-y-8">
                <div className="flex gap-20 w-max animate-marquee hover:[animation-play-state:paused]">
                    {[...tech, ...tech].map((t, i) => (
                        <div key={i} className="w-[120px] h-[120px] flex items-center justify-center transition-all duration-300">
                            <Image
                                src={t.icon}
                                alt={t.name}
                                width={80}
                                height={80}
                                loading="lazy"
                                title={t.name}
                                sizes="80px"
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-20 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
                    {[...aiTech, ...aiTech, ...aiTech, ...aiTech].map((t, i) => (
                        <div key={i} className="w-[120px] h-[120px] flex flex-col items-center justify-center transition-all duration-300">
                            <Image
                                src={t.icon}
                                alt={t.name}
                                width={80}
                                height={80}
                                loading="lazy"
                                title={t.name}
                                sizes="80px"
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}