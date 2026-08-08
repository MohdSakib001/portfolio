"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  buildBlurRamp,
  buildGlassTextures,
  PROGRESSIVE_BLUR_RANGE,
  supportsSvgBackdropFilter,
  type BlurRampDirection,
  type GlassTextures,
  type SurfaceProfile,
} from "@/lib/liquid-glass";

/**
 * Tones only supply defaults. Any of `tint`, `edge`, `fallbackTint` or
 * `specularOpacity` passed explicitly still wins.
 *
 * Dark glass needs a much denser fill than light glass: over a white page a
 * 0.5 alpha black only reaches mid grey, which reads as a dimmed bar rather
 * than as glass. The rim also has to work harder to separate the edge from
 * whatever is behind it.
 */
const TONES = {
  light: {
    tint: "rgba(255,255,255,0.1)",
    fallbackTint: "rgba(255,255,255,0.60)",
    edge: "rgba(255,255,255,0.30)",
    specularOpacity: 0.42,
  },
  dark: {
    tint: "rgba(14,14,18,0.62)",
    fallbackTint: "rgba(14,14,18,0.78)",
    edge: "rgba(255,255,255,0.16)",
    specularOpacity: 0.62,
  },
} as const;

export type GlassTone = keyof typeof TONES;

export type LiquidGlassProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;

  /** Corner radius in px. Owned by this component — do not also set a rounded-* class. */
  radius?: number;
  /** How far the curved bezel reaches inward from the edge, in px. */
  bezel?: number;
  /** Peak glass depth in px. The main dial for how hard the edge bends light. */
  thickness?: number;
  /** Refractive index. 1.5 is window glass. */
  ior?: number;
  profile?: SurfaceProfile;

  /** Backdrop blur in px, applied after refraction so it hides 8-bit banding. */
  blur?: number;
  /** Backdrop saturation multiplier. Glass concentrates colour. */
  saturation?: number;

  /** Rim light direction in degrees. 0 is from the right, going clockwise. */
  specularAngle?: number;
  specularOpacity?: number;
  /** Highlight tightness — higher keeps the rim thinner. */
  specularSharpness?: number;
  /**
   * Gain on the highlight before it clips at 1. Above ~3 the rim stops being a
   * soft bloom and becomes a hard bright edge, which is the iOS look.
   */
  specularSaturation?: number;

  /**
   * Refraction strength, 0-1. Scales the displacement without regenerating the
   * map, so this is the only optic here that is cheap to animate.
   */
  refraction?: number;
  /**
   * Strength of a second, heavier blur pass ramped across the surface, 0-1.
   * 0 disables it and drops the extra filter primitives entirely.
   */
  progressiveBlur?: number;
  /** Which end of the surface the heavy blur ramps toward. */
  progressiveBlurDirection?: BlurRampDirection;

  /** Preset defaults for `tint`, `edge`, `fallbackTint` and `specularOpacity`. */
  tone?: GlassTone;
  /** Fill painted over the refracted backdrop. */
  tint?: string;
  /** Inset hairline ring, or null for none. */
  edge?: string | null;
  /** Outer drop shadow, or null for none. */
  shadow?: string | null;

  /** Texture pixels per CSS px. Lower is cheaper on very large surfaces. */
  resolution?: number;
  /** Skip refraction and render the CSS-only surface. Useful for A/B checks. */
  forceFallback?: boolean;
  /** Blur used by the non-Chromium surface, which has no refraction to reveal. */
  fallbackBlur?: number;
  /** Tint used by the non-Chromium surface. Defaults to `tint`. */
  fallbackTint?: string;
};

/** Trailing debounce so a height transition does not rebuild the map per frame. */
const RESIZE_DEBOUNCE_MS = 120;

type BuiltGlass = {
  width: number;
  height: number;
  textures: GlassTextures;
};

/*
  Engine support is read through useSyncExternalStore rather than an effect:
  it never changes at runtime, so there is nothing to subscribe to, and the
  server snapshot of `false` guarantees SSR and the first client render agree
  on the fallback surface before the refracting one swaps in.
*/
const neverChanges = () => () => {};
const noSupportOnServer = () => false;

export default function LiquidGlass({
  children,
  as,
  className,
  style,
  radius = 24,
  bezel = 16,
  thickness = 18,
  ior = 1.5,
  profile = "convexSquircle",
  blur = 1,
  saturation = 1.6,
  specularAngle = -60,
  specularOpacity,
  specularSharpness = 12,
  specularSaturation = 1,
  refraction = 1,
  progressiveBlur = 0,
  progressiveBlurDirection = "to-bottom",
  tone = "light",
  tint,
  edge,
  shadow = "0 4px 24px rgba(0,0,0,0.08)",
  resolution = 1,
  forceFallback = false,
  fallbackBlur = 8,
  fallbackTint,
  ...rest
}: LiquidGlassProps) {
  const Tag = (as ?? "div") as ElementType;

  const preset = TONES[tone];
  const resolvedTint = tint ?? preset.tint;
  const resolvedFallbackTint = fallbackTint ?? preset.fallbackTint;
  const resolvedEdge = edge === undefined ? preset.edge : edge;
  const resolvedSpecularOpacity = specularOpacity ?? preset.specularOpacity;

  const hostRef = useRef<HTMLElement>(null);
  const builtSizeRef = useRef<string | null>(null);
  const [glass, setGlass] = useState<BuiltGlass | null>(null);

  const engineSupports = useSyncExternalStore(
    neverChanges,
    supportsSvgBackdropFilter,
    noSupportOnServer,
  );

  const rawId = useId();
  const filterId = useMemo(
    () => `liquid-glass-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawId],
  );

  /*
    One effect owns measuring and generating, because the textures are a pure
    function of the border box plus the optics. Every setState happens inside a
    rAF or timeout callback, never in the effect body, so a resize cannot
    cascade renders. ResizeObserver fires once on observe(), which doubles as
    the initial measurement — the first build goes through rAF for immediacy
    and everything after it is debounced so an animating height does not
    rebuild the map on every frame.
  */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // The optics changed, so whatever is cached is stale by definition.
    builtSizeRef.current = null;

    let timer: number | undefined;
    let frame = 0;
    let isFirst = true;

    const rebuild = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      if (!(width > 0) || !(height > 0)) {
        builtSizeRef.current = null;
        setGlass(null);
        return;
      }

      const key = `${width}x${height}`;
      if (builtSizeRef.current === key) return;

      const textures = buildGlassTextures({
        width,
        height,
        radius,
        bezel,
        thickness,
        ior,
        profile,
        specularAngle,
        specularOpacity: resolvedSpecularOpacity,
        specularSharpness,
        specularSaturation,
        resolution,
      });

      builtSizeRef.current = textures ? key : null;
      setGlass(textures ? { width, height, textures } : null);
    };

    const observer = new ResizeObserver(() => {
      if (isFirst) {
        isFirst = false;
        frame = requestAnimationFrame(rebuild);
        return;
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(rebuild, RESIZE_DEBOUNCE_MS);
    });
    observer.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [
    radius,
    bezel,
    thickness,
    ior,
    profile,
    specularAngle,
    resolvedSpecularOpacity,
    specularSharpness,
    specularSaturation,
    resolution,
  ]);

  // Independent of geometry, so it survives every resize.
  const blurRamp = useMemo(
    () => (progressiveBlur > 0 ? buildBlurRamp(progressiveBlurDirection) : null),
    [progressiveBlur, progressiveBlurDirection],
  );

  // Until the first texture exists there is nothing to displace, so the plain
  // blur stands in and the swap is invisible.
  const isRefracting = engineSupports && !forceFallback && glass !== null;

  const backdrop = isRefracting
    ? `url(#${filterId})`
    : `blur(${fallbackBlur}px) saturate(${saturation})`;

  return (
    <Tag
      {...rest}
      ref={hostRef}
      className={className}
      style={{
        position: "relative",
        borderRadius: radius,
        boxShadow: shadow ?? undefined,
        ...style,
      }}
    >
      {/* Refracted (or blurred) backdrop, plus the tint and the edge ring. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          pointerEvents: "none",
          background: isRefracting ? resolvedTint : resolvedFallbackTint,
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
          boxShadow: resolvedEdge ? `inset 0 0 0 1px ${resolvedEdge}` : undefined,
        }}
      />

      {/*
        The rim light is a plain image layer rather than an feBlend inside the
        filter. It is identical to look at, and it means Safari and Firefox
        still get the specular even though they drop the refraction.
      */}
      {glass ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            pointerEvents: "none",
            backgroundImage: `url(${glass.textures.specularMap})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      ) : null}

      {isRefracting && glass ? (
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0 }}
        >
          <defs>
            {/*
              userSpaceOnUse everywhere: as a backdrop-filter the region is not
              derived from the element, so the filter and the map both have to
              be told the pixel size explicitly. sRGB interpolation is required
              — under the default linearRGB the channel bytes stop meaning
              offsets and the refraction goes wrong.
            */}
            <filter
              id={filterId}
              filterUnits="userSpaceOnUse"
              primitiveUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={glass.width}
              height={glass.height}
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={glass.textures.displacementMap}
                x={0}
                y={0}
                width={glass.width}
                height={glass.height}
                preserveAspectRatio="none"
                result="displacementMap"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="displacementMap"
                scale={glass.textures.scale * refraction}
                xChannelSelector="R"
                yChannelSelector="G"
                result="refracted"
              />
              <feGaussianBlur
                in="refracted"
                stdDeviation={blur}
                result="softened"
              />

              {/*
                Progressive blur: a second, heavier pass clipped to the ramp's
                alpha and merged over the base pass. Because the base pass is
                opaque, that over-composite is exactly a per-pixel mix between
                the two blur radii — no explicit interpolation primitive
                needed.
              */}
              {blurRamp ? (
                <feGaussianBlur
                  in="refracted"
                  stdDeviation={blur + progressiveBlur * PROGRESSIVE_BLUR_RANGE}
                  result="deepBlur"
                />
              ) : null}
              {blurRamp ? (
                <feImage
                  href={blurRamp}
                  x={0}
                  y={0}
                  width={glass.width}
                  height={glass.height}
                  preserveAspectRatio="none"
                  result="blurRamp"
                />
              ) : null}
              {blurRamp ? (
                <feComposite
                  in="deepBlur"
                  in2="blurRamp"
                  operator="in"
                  result="deepMasked"
                />
              ) : null}
              {blurRamp ? (
                <feMerge result="graded">
                  <feMergeNode in="softened" />
                  <feMergeNode in="deepMasked" />
                </feMerge>
              ) : null}

              <feColorMatrix
                in={blurRamp ? "graded" : "softened"}
                type="saturate"
                values={String(saturation)}
              />
            </filter>
          </defs>
        </svg>
      ) : null}

      <div style={{ position: "relative" }}>{children}</div>
    </Tag>
  );
}
