import {
  AlignLeft,
  ArrowLeftRight,
  BookOpen,
  Braces,
  Briefcase,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Clock,
  Crop,
  Database,
  Download,
  Eraser,
  Eye,
  FileCode,
  FileImage,
  FileOutput,
  FileText,
  GitBranch,
  Globe,
  Hash,
  Home,
  KeyRound,
  Lock,
  Maximize2,
  Palette,
  PenLine,
  Percent,
  Plug,
  QrCode,
  Receipt,
  Scale,
  Search,
  Shuffle,
  Smile,
  Sparkles,
  Table2,
  Timer,
  Type,
  Video,
  type LucideProps,
} from "lucide-react";
import type { ElementType } from "react";

import { tools } from "@/data/tools";

export const ICON_MAP: Record<string, ElementType<LucideProps>> = {
  AlignLeft,
  ArrowLeftRight,
  BookOpen,
  Braces,
  Briefcase,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Clock,
  Crop,
  Database,
  Download,
  Eraser,
  Eye,
  FileCode,
  FileImage,
  FileOutput,
  FileText,
  GitBranch,
  Globe,
  Hash,
  Home,
  KeyRound,
  Lock,
  Maximize2,
  Palette,
  PenLine,
  Percent,
  Plug,
  QrCode,
  Receipt,
  Scale,
  Search,
  Shuffle,
  Smile,
  Sparkles,
  Table2,
  Timer,
  Type,
  Video,
};

/**
 * Fallback for tools whose `icon` has no entry above. Kept as a plain export so
 * call sites can use `ICON_MAP[x] ?? FALLBACK_ICON` — resolving the icon through
 * a function instead trips `react-hooks/static-components`, which cannot tell a
 * lookup apart from a component defined during render.
 */
export const FALLBACK_ICON = FileText;

/** Colors by index — not by category — so grids look varied. */
export const PALETTE = [
  { bg: "#F0EBFF", color: "#7c3aed" },
  { bg: "#EFF6FF", color: "#3b82f6" },
  { bg: "#ECFDF5", color: "#059669" },
  { bg: "#FFF7ED", color: "#ea580c" },
  { bg: "#FFF1F2", color: "#e11d48" },
  { bg: "#F0FDFA", color: "#0d9488" },
  { bg: "#FEFCE8", color: "#b45309" },
  { bg: "#F5F3FF", color: "#8b5cf6" },
];

/** Stable palette entry per tool, keyed off its index in `tools`. */
export const getToolPalette = (id: string) => {
  const index = tools.findIndex((tool) => tool.id === id);
  return PALETTE[(index < 0 ? 0 : index) % PALETTE.length];
};
