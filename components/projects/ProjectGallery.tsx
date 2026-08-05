"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import PaperOverlay from "@/components/PaperOverlay";
import { ScreenShell, PhoneShell } from "./frames";

type GalleryItem = { type: "image" | "video"; src: string };

type ProjectGalleryProps = {
  items: GalleryItem[];
  projectName: string;
  /** Mobile captures ride in a phone shell, web captures in a plain frame. */
  variant: "mobile" | "web";
  /** Pastel panel the track sits on — the project's own colour. */
  bg: string;
  title?: string;
  description?: string;
  /** Rendered beside the arrows, e.g. a link through to the case study. */
  action?: ReactNode;
};

/**
 * Slide width lives in a CSS variable so one number per breakpoint drives both
 * the slide and the scroll maths.
 */
const TRACK_SIZING: Record<ProjectGalleryProps["variant"], string> = {
  mobile: "[--slide:min(15rem,60vw)] sm:[--slide:16rem] lg:[--slide:17rem]",
  web: "[--slide:74vw] sm:[--slide:min(32rem,72vw)] lg:[--slide:46rem]",
};

const SLIDE_SIZES: Record<ProjectGalleryProps["variant"], string> = {
  mobile: "(max-width: 640px) 60vw, 272px",
  web: "(max-width: 640px) 74vw, (max-width: 1024px) 72vw, 736px",
};

export default function ProjectGallery({
  items,
  projectName,
  variant,
  bg,
  title = "What it looks like.",
  description,
  action,
}: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [scrollable, setScrollable] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setScrollable(max > 4);
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();
    // Slide width is viewport-relative, so the ends move when the box resizes.
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync]);

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    const gap = 16;
    const distance = slide ? slide.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }, []);

  if (!items.length) return null;

  const isMobile = variant === "mobile";
  const Shell = isMobile ? PhoneShell : ScreenShell;

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-heading font-semibold leading-none tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-xl text-caption leading-relaxed text-black/40">
              {description}
            </p>
          )}
        </div>

        {(action || scrollable) && (
          <div className="flex shrink-0 items-center gap-3">
            {action}

            {scrollable && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={atStart}
                  aria-label={`Previous ${projectName} screen`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition duration-200 enabled:hover:bg-neutral-800 disabled:bg-black/8 disabled:text-black/25 sm:h-11 sm:w-11"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={atEnd}
                  aria-label={`Next ${projectName} screen`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition duration-200 enabled:hover:bg-neutral-800 disabled:bg-black/8 disabled:text-black/25 sm:h-11 sm:w-11"
                >
                  <ChevronRight size={17} />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div
        className="relative overflow-hidden rounded-4xl"
        style={{ backgroundColor: bg }}
      >
        <PaperOverlay />

        <div
          ref={trackRef}
          onScroll={sync}
          /**
           * `safe center` centres a short set and falls back to start
           * alignment once the track overflows, so nothing becomes
           * unreachable and there is never dead space beside the slides.
           */
          className={`relative flex snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-smooth scroll-pl-6 px-6 py-10 md:scroll-pl-10 md:px-10 md:py-14 [-ms-overflow-style:none] [justify-content:safe_center] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${TRACK_SIZING[variant]}`}
        >
          {items.map((item, index) => (
            <Shell
              key={`${item.src}-${index}`}
              className="w-[var(--slide)] shrink-0 snap-start"
            >
              <div>
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={`${projectName} screen ${index + 1}`}
                    width={isMobile ? 720 : 1600}
                    height={isMobile ? 1560 : 900}
                    sizes={SLIDE_SIZES[variant]}
                    className="h-auto w-full"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-auto w-full"
                  />
                )}
              </div>
            </Shell>
          ))}
        </div>
      </div>
    </>
  );
}
