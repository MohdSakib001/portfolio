export type TestimonialEntry = {
  id: string;
  name: string;
  company: string;
  quote: string;
  /** Headshot in `public/assets/testimonials`. Falls back to an initial. */
  avatar?: string;
};

export const TESTIMONIALS: TestimonialEntry[] = [
  {
    id: "adam",
    name: "Adam",
    company: "Stakeclash",
    avatar: "/assets/testimonials/1.png",
    quote:
      "Working with Sakib on Stakeclash was a game changer. He turned a complex staking interface into something our users actually enjoy — the speed and attention to detail were unlike anything I'd experienced.",
  },
  {
    id: "oniya",
    name: "Oniya",
    company: "Pademi & Tekish Health",
    quote:
      "Sakib brought clarity to two very different products at once. Both Pademi and Tekish Health launched on time with zero compromises on the experience. He just gets it.",
  },
  {
    id: "chiddy",
    name: "Chiddy",
    company: "Colaw",
    quote:
      "Colaw needed someone who could handle legal complexity without losing sight of the user. Sakib delivered exactly that — a clean, intuitive product that our clients and team both love.",
  },
  {
    id: "krapton",
    name: "Krapton",
    company: "Techsleight",
    quote:
      "The bar Sakib sets for product quality is exceptional. Techsleight looks and works exactly as we envisioned it, and the process was seamless from start to finish.",
  },
];
