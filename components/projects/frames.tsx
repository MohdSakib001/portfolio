import type { ReactNode } from "react";

/**
 * Device shells shared by the project hero and the gallery carousel, so a
 * screenshot always reads as the surface it was captured on.
 */

type ShellProps = {
  children: ReactNode;
  className?: string;
};

/** Black-bezel phone shell for portrait app captures. */
export function PhoneShell({ children, className = "" }: ShellProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.9rem] bg-black p-[3px] shadow-[0_22px_55px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.75rem] bg-white">
        {children}
      </div>
    </div>
  );
}

/** Plain framed shell for wide web captures — the screenshot and nothing else. */
export function ScreenShell({ children, className = "" }: ShellProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-[0_22px_55px_rgba(0,0,0,0.18)] ring-1 ring-black/8 ${className}`}
    >
      {children}
    </div>
  );
}
