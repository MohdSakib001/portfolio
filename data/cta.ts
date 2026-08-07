import { Boxes, Clock3, Globe2, Layers, MessageCircle, Zap } from "lucide-react";

import type { CtaPill } from "@/components/CtaSection";

/** How I work — closing CTA on services, project detail, and blog detail. */
export const AVAILABILITY_PILLS: CtaPill[] = [
  { icon: Clock3, label: "US/UK overlap calls" },
  { icon: MessageCircle, label: "Async updates" },
  { icon: Globe2, label: "Remote from India" },
];

/** Portfolio breadth — closing CTA on the projects index. */
export const PORTFOLIO_PILLS: CtaPill[] = [
  { icon: Zap, label: "Shipped end to end" },
  { icon: Layers, label: "Mobile, web & AI" },
  { icon: Boxes, label: "Available for work" },
];
