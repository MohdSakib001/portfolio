# Mohd Sakib Portfolio Design System

Use this guide before adding or changing any UI in this repo. The current visual language is an editorial developer portfolio: warm, minimal, product-focused, with polished utility surfaces and playful but restrained color.

## Design Personality

- **Sharp portfolio first.** The UI should feel like a senior builder's personal site, not a generic SaaS template.
- **Warm white canvas.** Default pages use white or warm off-white with black type and subtle neutral borders.
- **Craft over decoration.** Prefer spacing, typography, glass, product imagery, and useful interaction over ornamental backgrounds.
- **Pastel technical energy.** Feature blocks and bento cards use soft, saturated pastel panels with paper texture overlays.
- **Dense where useful.** Tools can be compact and functional, but still polished.

## Core Tokens

### Colors

- Page background: `#ffffff` for most route pages, `#fcf9f7` from `--background` for the global warm base.
- Primary text: `#000000`, `#171717`, or near-black `#1c1b18`.
- Muted text: `text-black/40`, `text-black/50`, `text-neutral-400`, `text-neutral-500`.
- Primary action: black background with white text, hover to `neutral-800`.
- Glass surface: `rgba(255,255,255,0.45)` to `rgba(255,255,255,0.90)` with 6-8px backdrop blur.
- Borders/shadows: very soft black at `0.05` to `0.08` opacity.

Recommended pastel panels:

- Violet: `bg-violet-300/70`, `#E6E0F8`
- Green: `bg-green-200/70`, `bg-emerald-300/70`, `#DAF0DE`
- Sky/blue: `bg-sky-300/70`, `#DCE8F6`
- Amber/yellow: `bg-amber-300/70`, `#F4EDDA`
- Rose: `bg-rose-300/70`
- Orange: `bg-orange-300/70`

Use category colors from `data/tools.ts` for tool listings and tool metadata:

- Text: `#3b82f6` on `#eff6ff`
- Image: `#7c3aed` on `#f5f3ff`
- Calculator: `#059669` on `#ecfdf5`
- Productivity: `#ea580c` on `#fff7ed`
- Developer: `#e11d48` on `#fff1f2`

### Typography

Fonts are defined in `app/layout.tsx` and `app/globals.css`.

- Sans: Geist, default for most UI.
- Display serif: Cormorant Garamond is available as `--font-cormorant`, but the current UI mostly uses sans display. Use serif sparingly for editorial moments.
- Mono: Geist Mono for code, stats, technical labels, JSON, passwords, and IDs.

Use the Tailwind theme tokens from `app/globals.css`:

- Hero display: `text-display`, `leading-none`, usually `font-semibold`, tight tracking.
- Section heading: `text-heading`, `font-semibold`, `tracking-tight` or `tracking-tighter`.
- Card title: `text-title`.
- Body: `text-body`, `leading-relaxed`.
- Captions: `text-caption`.
- Micro labels: `text-label`, uppercase, `tracking-[0.12em]` to `tracking-[0.28em]`.

Do not introduce viewport-scaled font classes beyond the existing clamp tokens. Keep letter spacing non-negative.

## Layout

- Use `components/Container.tsx` for portfolio sections: `px-4 sm:px-6 md:px-10 lg:px-16 py-24 max-w-6xl lg:mx-auto`.
- Page heroes generally start below the fixed nav with `pt-40` or use full viewport only on the homepage hero.
- Main content width usually caps at `max-w-6xl`; special bento/work sections may use `max-w-400`.
- Common section rhythm: large vertical padding (`py-24`, `py-32`) and simple grids.
- Use responsive grids: `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`.
- Avoid nested cards. A section can be a full-width colored/paper panel, then cards inside it.

## Surfaces

### Glass

Use glass for nav dropdowns, mini metric boxes, and overlays:

```tsx
style={{
  background: "rgba(255,255,255,0.60)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.72)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 24px rgba(0,0,0,0.08)",
}}
```

For simple reusable glass, use `BlurContainer` and add radius/padding at the call site.

### Paper Pastel Panels

Use this overlay on colored feature panels and bento cards:

```tsx
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
  style={{
    backgroundImage: `url("/assets/paper-texture.avif")`,
    backgroundSize: "cover",
  }}
/>
```

The parent should be `relative overflow-hidden` and usually `rounded-2xl` to `rounded-4xl`.

### Utility Tool Cards

Tool interiors use crisp cards:

- White tools: `background: "#ffffff"` with `boxShadow: "0 0 0 1px rgba(3,3,2,0.06), 0 4px 24px rgba(3,3,2,0.06)"`.
- Dark/code tools: near-black panels (`#0a0a0a`, `#0d1117`, `#1e1e1e`) with a single accent color.
- Inputs: `rounded-[10px]` to `rounded-[12px]`, 13-15px text, clear focus via border/accent color.
- Result/stat cards: `rounded-[16px]`, tabular numbers, tiny uppercase labels.

## Radius And Spacing

- Header closed: `rounded-[40px]`; header open: `rounded-[25px]`.
- Major pastel sections: `rounded-4xl`.
- Bento and tool cards: `rounded-2xl` or `rounded-[20px]`.
- Internal controls: `rounded-xl`, `rounded-[10px]`, or `rounded-[12px]`.
- Pills: `rounded-full`.
- Default card padding: `p-5`, `p-6`, `p-7`, `p-8`; large feature blocks use `p-8 md:p-12` or section-like padding.

## Components And Patterns

### Navigation

- Fixed glass header at `top-3 left-3 right-3 z-50 max-w-4xl mx-auto`.
- Brand is uppercase, compact, bold: `Sakib`.
- Desktop nav uses small captions. Dropdown panels are glassy, dense, and image/icon led.
- Mobile nav uses accordion-style panels with rounded glass groups.

### Buttons And Links

- Primary CTA: use `components/primaryButton.tsx`.
- Primary visual style: black pill/rounded button, white text, uppercase label, `text-label`, `tracking-[0.12em]`.
- Secondary links: plain text with caption sizing, sometimes arrow text.
- Icon buttons should use `lucide-react` when possible.
- For tool actions, use icon + short label when clarity matters: copy, clear, download, generate.

### Cards

- Portfolio cards are image/product forward with pastel backgrounds and paper texture.
- Tool grid cards use varied pastel backgrounds, lucide icons, compact descriptions, and live/soon status.
- Repeated card content should keep title, label, metric, and icon hierarchy tight.

### Section Headers

Default pattern:

```tsx
<div className="text-center mx-auto">
  <p className="text-label uppercase tracking-[0.25em] opacity-30 mb-3 font-medium">
    Section Label
  </p>
  <h2 className="text-heading font-semibold tracking-tight leading-none">
    Section Title.
  </h2>
  <p className="mt-3 text-caption text-black/40 max-w-lg leading-relaxed mx-auto">
    Short supporting copy.
  </p>
</div>
```

### Hand-Drawn Emphasis

The homepage and performance sections use inline SVG underline/circle marks. Use them rarely, around one or two words, with bright accents:

- Blue: `#60A5FA`
- Green: `#34D399`
- Amber: `#FBBF24`

## Tool Page Rules

New tools should blend with the existing utility suite:

- Route shape: `app/tools/[tool-id]/page.tsx` plus a client component when interactive.
- Page shell: white or tool-themed dark background, generous top padding, compact breadcrumb/back link, metadata, FAQ/help sections if useful.
- Main tool UI should be usable immediately, not hidden behind explanatory copy.
- Use local state and browser APIs when possible; privacy/no-upload is part of the brand.
- Each tool may have a distinct accent color, but keep the same structural language: rounded 20px panels, tiny uppercase labels, compact controls, one-click copy/download actions.
- Developer/security tools can be dark and mono-heavy. Writing/calculator/image tools should usually stay light unless the domain strongly suggests a theme.

## Imagery

- Use real product screenshots from `public/assets/projects` for project surfaces.
- Use `next/image` for images in app UI.
- Product screenshots should be visible and inspectable, usually `object-contain` for app screenshots and `object-cover` for hero/gallery imagery.
- Keep paper texture only as an overlay on pastel panels, not as the whole page background.

## Motion

- Keep transitions short: `duration-150`, `duration-200`, `duration-300`.
- Common hover: slight lift `hover:-translate-y-0.5`, subtle shadow increase, color fade.
- Avoid large decorative animation unless it serves a feature, such as workflow visualization.

## Accessibility

- Maintain contrast on pastel surfaces with black or near-black text.
- Buttons need `title` or clear accessible text when icon-only.
- Preserve visible labels for form controls.
- Use semantic inputs, buttons, sections, and headings.
- Do not rely on color alone for validation; include text/status.

## Implementation Conventions

- Prefer Tailwind utility classes already used in the repo.
- Inline styles are acceptable for exact glass, canvas, code editor, and generated-color UI where Tailwind would be noisy.
- Use `lucide-react` icons for tools and controls.
- Read `node_modules/next/dist/docs/` before using unfamiliar Next APIs. This project is on Next `16.2.2`, and `params` in dynamic routes are already async.
- Do not refactor existing visual systems while adding one feature unless the task explicitly asks for it.

## Before Shipping UI

- Check mobile and desktop spacing.
- Confirm text does not overflow buttons/cards.
- Keep the palette varied; avoid making an entire new section one-note purple, beige, slate, or orange.
- Reuse `Container`, `BlurContainer`, `PrimaryButton`, `GridSection`, existing tool category colors, and paper texture patterns where they fit.
- Preserve user edits in unrelated files.
