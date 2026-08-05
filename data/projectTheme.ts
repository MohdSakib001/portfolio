/**
 * Per-project surface colours and platform, shared by the home bento
 * (`components/BentoWork.tsx`) and the project detail page so a card and the
 * page it opens read as the same object.
 */
export type ProjectTheme = {
  /** Pastel panel background — the same palette family as DESIGN_SYSTEM.md. */
  bg: string;
  /** Saturated twin of `bg`, used for small accents. */
  accent: string;
  /** Drives the detail-page showcase: tilted phones vs. a wide framed shot. */
  platform: "mobile" | "web";
};

const THEMES: Record<string, ProjectTheme> = {
  voizo: { bg: "#F7E2DC", accent: "#D2694F", platform: "mobile" },
  stakeclash: { bg: "#E6E0F8", accent: "#7C6FD4", platform: "web" },
  artificialmufti: { bg: "#F4EDDA", accent: "#B8860B", platform: "mobile" },
  pademi: { bg: "#DAF0DE", accent: "#2E8B47", platform: "mobile" },
  techs: { bg: "#E2E3F6", accent: "#5B5FC7", platform: "web" },
  sendora: { bg: "#DCE8F6", accent: "#2563EB", platform: "web" },
  colaw: { bg: "#E8E4DA", accent: "#7D6E55", platform: "web" },
  tekish: { bg: "#FBE7D4", accent: "#C2703A", platform: "web" },
  teppe: { bg: "#E4EFDA", accent: "#5E8B34", platform: "web" },
};

const FALLBACK: ProjectTheme = {
  bg: "#E6E0F8",
  accent: "#7C6FD4",
  platform: "web",
};

export function getProjectTheme(id: string): ProjectTheme {
  return THEMES[id] ?? FALLBACK;
}
