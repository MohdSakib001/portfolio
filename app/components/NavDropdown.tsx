import type { ReactNode } from "react";

export default function NavDropdown({
  label,
  width = "w-72",
  children,
}: {
  label: string;
  width?: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative">
      {/* Trigger */}
      <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300 cursor-default select-none">
        {label}
        <svg
          className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </span>

      {/* Invisible bridge — keeps :hover alive across the visual gap */}
      <div className="absolute h-3 inset-x-0 top-full" />

      {/* Glass panel */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.75rem)] z-50 ${width} max-w-[calc(100vw-2rem)] opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out`}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.60)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.80), 0 24px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
