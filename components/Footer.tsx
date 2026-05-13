"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "./Magnetic";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const currentYear = new Date().getFullYear();

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-black text-white relative overflow-hidden"
    >
      {/* CTA MARQUEE — massive repeating text */}
      <div
        ref={marqueeRef}
        aria-hidden="true"
        className="py-16 md:py-24 overflow-hidden border-b border-white/10"
      >
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
            <h2 className="text-heading leading-[1.1] tracking-tight footer-reveal">
              Got a project?
              <br />
              <span className="opacity-40">Let&apos;s talk.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end footer-reveal">
            <p className="text-label uppercase tracking-[0.2em] opacity-30 mb-4">
              Reach out
            </p>
            <Magnetic>
              <a
                href="mailto:mohdsakib.work@gmail.com"
                className="text-title underline underline-offset-8 decoration-white/30 hover:decoration-white transition-all duration-500"
              >
                mohdsakib.work@gmail.com
              </a>
            </Magnetic>
          </div>
        </div>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            {
              href: "https://wa.me/917417141204",
              title: "WHATSAPP",
              desc: "Let's Talk, I'm just a message away",
              bg: "#25D366",
              theme: "light",
              iconBg: "rgba(255,255,255,0.18)",
              icon: (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              ),
            },
            {
              href: "https://www.linkedin.com/in/mohdsakib001",
              title: "LINKEDIN",
              desc: "Let's connect",
              bg: "#0A66C2",
              theme: "dark",
              iconBg: "rgba(255,255,255,0.15)",
              icon: (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              ),
            },
            {
              href: "https://github.com/mohdsakib-Krapton",
              title: "GITHUB",
              desc: "See my work",
              bg: "#171515",
              theme: "dark",
              iconBg: "rgba(0,0,0,0.06)",
              icon: (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              ),
            },
            {
              href: "https://twitter.com/mohdsakib001",
              title: "@MOHDSAKIB001",
              desc: "Follow along",
              bg: "#E8E8E6",
              theme: "light",
              iconBg: "rgba(0,0,0,0.06)",
              icon: (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="footer-reveal relative group rounded-3xl p-6 flex flex-col items-center text-center justify-top aspect-square hover:scale-[1.03] transition-transform "
              style={{ backgroundColor: card.bg}}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay opacity-55"
                style={{
                  backgroundImage: `url("/assets/paper-texture.avif")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="flex-[0.4] flex items-center justify-center">
                <div
                  className="w-18 h-18 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  {card.icon}
                </div>
              </div>
              <div className="flex-[0.6]">
                <p
                  className="text-body font-semibold uppercase mt-2"
                  style={{
                    color: card.theme === "dark" ? "#fff" : "#000",
                  }}
                >
                  {card.title}
                </p>
                <p
                  className="text-body opacity-60 mt-2"
                  style={{
                    color: card.theme === "dark" ? "#fff" : "#000",
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="footer-reveal">
            <p className="text-label uppercase tracking-[0.2em] opacity-30 mb-6">Navigation</p>
            <div className="flex flex-col gap-3">
              {["Home", "Work", "About", "Contact"].map((item) => (
                <Magnetic key={item}>
                  <a href={item === "Home" ? "/" : `#${item.toLowerCase()}`} className="text-caption opacity-60 hover:opacity-100 transition-opacity duration-300">
                    {item}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="footer-reveal">
            <p className="text-label uppercase tracking-[0.2em] opacity-30 mb-6">Socials</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "GitHub", url: "https://github.com/mohdsakib-Krapton" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/mohdsakib001" },
                { label: "Twitter", url: "https://twitter.com/mohdsakib001" },
              ].map((s) => (
                <Magnetic key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener" className="text-caption opacity-60 hover:opacity-100 transition-opacity duration-300">
                    {s.label} ↗
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="footer-reveal">
            <p className="text-label uppercase tracking-[0.2em] opacity-30 mb-6">Services</p>
            <div className="flex flex-col gap-3 text-sm opacity-60">
              <a href="/#work" className="hover:opacity-100 transition-opacity duration-300">Full-Stack Dev</a>
              <a href="/#work" className="hover:opacity-100 transition-opacity duration-300">React Native</a>
              <a href="/#work" className="hover:opacity-100 transition-opacity duration-300">System Design</a>
              <a href="/#work" className="hover:opacity-100 transition-opacity duration-300">AI Integration</a>
            </div>
          </div>

          <div className="footer-reveal">
            <p className="text-label uppercase tracking-[0.2em] opacity-30 mb-6">Status</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-caption opacity-80">Available for work</span>
            </div>
            <p className="text-caption opacity-40">
              Open to freelance, full-time,
              <br />
              and collaboration.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-label opacity-30 footer-reveal">
            © {currentYear} Mohd Sakib. Built from scratch.
          </p>

          <div className="flex items-center gap-6 footer-reveal">
            <span className="text-label opacity-20">Next.js • GSAP • Lenis</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
