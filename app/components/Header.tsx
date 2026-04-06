"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Magnetic from "./Magnetic";

const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);
    const router = useRouter();
    const pathname = usePathname();

    // Scroll — hide on down, show on up
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 80);
            if (y > 150) {
                setHidden(y > lastScrollY.current);
            } else {
                setHidden(false);
            }
            lastScrollY.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    // Close on route change
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        if (pathname !== "/") {
            router.push("/" + href);
        } else {
            const el = document.querySelector(href);
            el?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* HEADER BAR */}
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
                    } ${menuOpen
                        ? "py-5 bg-transparent text-white"
                        : scrolled
                            ? "py-3 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 shadow-[0_1px_10px_rgba(0,0,0,0.06)] text-black"
                            : "py-5 bg-white text-black"
                    }`}
            >
                <div className="px-6 md:px-16 flex items-center justify-between">

                    {/* LOGO */}
                    <Magnetic>
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-3"
                        >
                            <span className="text-lg font-bold tracking-[0.08em] uppercase">
                                Sakib
                            </span>
                            <span className="hidden sm:block text-[10px] tracking-[0.2em] uppercase opacity-40">
                                — Developer
                            </span>
                        </button>
                    </Magnetic>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Magnetic key={link.label}>
                                <button
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
                                >
                                    {link.label}
                                </button>
                            </Magnetic>
                        ))}

                        <div className="w-px h-4 bg-neutral-300 mx-3" />

                        {/* CTA */}
                        <Magnetic>
                            <a
                                href="mailto:mohdsakib.work@gmail.com"
                                className="ml-4 text-[11px] uppercase tracking-[0.12em] font-medium bg-black text-white px-6 py-2.5 hover:bg-neutral-800 transition-colors duration-300"
                            >
                                Let&apos;s Talk
                            </a>
                        </Magnetic>
                    </nav>

                    {/* HAMBURGER */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden relative w-7 h-5 flex flex-col justify-between"
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-[2px] w-full transition-all duration-500 origin-center ${menuOpen ? "bg-white rotate-45 translate-y-[9px]" : "bg-current"}`} />
                        <span className={`block h-[2px] transition-all duration-300 ${menuOpen ? "bg-white opacity-0 w-0" : "bg-current opacity-100 w-full"}`} />
                        <span className={`block h-[2px] w-full transition-all duration-500 origin-center ${menuOpen ? "bg-white -rotate-45 -translate-y-[9px]" : "bg-current"}`} />
                    </button>
                </div>
            </header>

            {/* FULLSCREEN MENU — pure CSS, no GSAP */}
            <div
                className={`fixed inset-0 z-90 bg-black flex flex-col justify-between transition-all duration-700 ease-in-out ${menuOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
                style={{
                    clipPath: menuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                    transition: "clip-path 0.7s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease",
                }}
            >
                <div className="px-8 md:px-16 pt-8 flex justify-between items-center">
                </div>

                {/* NAV LINKS */}
                <nav className="px-8 md:px-16 flex flex-col gap-3">
                    {[
                        { label: "Home", href: "/" },
                        ...navLinks,
                    ].map((link, i) => (
                        <button
                            key={link.label}
                            onClick={() => {
                                if (link.href === "/") {
                                    router.push("/");
                                    setMenuOpen(false);
                                } else {
                                    handleNavClick(link.href);
                                }
                            }}
                            className="text-white text-5xl md:text-7xl text-left leading-tight tracking-tight hover:text-white/60 transition-all duration-300"
                            style={{
                                transform: menuOpen ? "translateY(0)" : "translateY(40px)",
                                opacity: menuOpen ? 1 : 0,
                                transition: `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.06}s, opacity 0.5s ease ${0.1 + i * 0.06}s`,
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* BOTTOM DETAILS */}
                <div
                    className="px-8 md:px-16 pb-8 flex flex-col md:flex-row md:justify-between gap-6"
                    style={{
                        transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                        opacity: menuOpen ? 1 : 0,
                        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, opacity 0.5s ease 0.4s",
                    }}
                >
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Email</p>
                        <a href="mailto:mohdsakib.work@gmail.com" className="text-sm text-white/80 hover:text-white transition-colors">
                            mohdsakib.work@gmail.com
                        </a>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Socials</p>
                        <div className="flex gap-4 text-sm text-white/80">
                            <a href="https://github.com/mohdsakib" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a>
                            <a href="https://linkedin.com/in/mohdsakib" target="_blank" rel="noopener" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Location</p>
                        <p className="text-sm text-white/80">Uttar Pradesh, India</p>
                    </div>
                </div>
            </div>
        </>
    );
}
