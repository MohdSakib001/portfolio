/**
 * Liquid Glass — physically-derived refraction textures.
 *
 * This module is framework-free: it takes a rounded-rectangle geometry plus a
 * bezel profile and returns two PNG data URLs.
 *
 *   1. A *displacement map* consumed by `<feDisplacementMap />`, where the red
 *      channel encodes X offset and the green channel encodes Y offset.
 *   2. A *specular map* — a white rim light with a varying alpha — painted as a
 *      plain CSS layer so it works in every browser, not just Chromium.
 *
 * The displacement is not faked with a gradient. For every pixel inside the
 * bezel we reconstruct the glass surface normal, refract a vertical ray through
 * it with Snell's law, and measure how far that ray lands from where it would
 * have landed with no glass in the way.
 *
 * Simplifying assumptions (same ones Apple's effect can get away with):
 *   - ambient medium is air (n = 1), incident rays are orthogonal to the page
 *   - one refraction event only; the exit surface is ignored
 *   - the glass sits flush on the background, so the ray's vertical travel
 *     inside the glass equals the surface height at that point
 */

export type SurfaceProfile =
  | "convexCircle"
  | "convexSquircle"
  | "concave"
  | "lip";

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

const smootherstep = (x: number) => {
  const t = clamp01(x);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/** y = sqrt(1 - (1 - x)^2) — a spherical dome. Sharper flat/curve seam. */
const convexCircle = (x: number) => {
  const u = 1 - clamp01(x);
  return Math.sqrt(Math.max(0, 1 - u * u));
};

/** y = (1 - (1 - x)^4)^(1/4) — the squircle. Softer seam, smoother gradients. */
const convexSquircle = (x: number) => {
  const u = 1 - clamp01(x);
  return Math.pow(Math.max(0, 1 - u * u * u * u), 0.25);
};

/**
 * Height of the glass at a normalised distance from the outer edge, where
 * 0 is the edge and 1 is where the bezel meets the flat interior.
 */
export const SURFACE_PROFILES: Record<
  SurfaceProfile,
  (x: number) => number
> = {
  convexCircle,
  convexSquircle,
  // Bowl-shaped: rays diverge and get pushed outside the shape.
  concave: (x) => 1 - convexSquircle(x),
  // Raised rim with a shallow dip in the middle — what a switch track wants.
  lip: (x) => {
    const convex = convexSquircle(x);
    const t = smootherstep(x);
    return convex * (1 - t) + (1 - convex) * t;
  },
};

/**
 * `<feDisplacementMap />` reads an 8-bit channel as
 * `offset = scale * (channel / 255 - 0.5)`, so a byte carries a signed
 * fraction and 128 means "no displacement". 127 steps per direction is the
 * entire precision budget, which is also why sampling the profile any finer
 * than this buys nothing.
 */
const LUT_SAMPLES = 128;
const NEUTRAL = 128;
const ENCODE_RANGE = 127;

type RadialField = {
  /** Signed displacement in px per sample. Positive points into the shape. */
  magnitudes: Float32Array;
  /** Surface slope (dHeight/dDistance) per sample, for the specular pass. */
  slopes: Float32Array;
  /** Largest absolute displacement, used to normalise and to set filter scale. */
  max: number;
};

/**
 * Trace one ray per sample along a single radius. Because displacement only
 * depends on distance-from-edge, this 1D field is valid all the way around the
 * shape — we just rotate it onto each pixel's own edge normal later.
 */
function traceRadialField(
  profile: SurfaceProfile,
  bezel: number,
  thickness: number,
  ior: number,
): RadialField {
  const f = SURFACE_PROFILES[profile];
  const magnitudes = new Float32Array(LUT_SAMPLES);
  const slopes = new Float32Array(LUT_SAMPLES);
  const step = 1 / (LUT_SAMPLES - 1);
  const eps = 1e-3;
  let max = 0;

  for (let i = 0; i < LUT_SAMPLES; i++) {
    const x = i * step;

    // Height in px, and the surface slope from a central difference. Dividing
    // by `bezel` converts the derivative from profile-space into px/px.
    const height = thickness * f(x);
    const a = Math.max(0, x - eps);
    const b = Math.min(1, x + eps);
    const slope = (thickness * (f(b) - f(a))) / (bezel * (b - a));
    slopes[i] = slope;

    // The surface normal tilts away from vertical by exactly atan(slope), so
    // for a vertical incident ray that tilt *is* the angle of incidence.
    const theta1 = Math.atan(Math.abs(slope));
    const theta2 = Math.asin(Math.min(1, Math.sin(theta1) / ior));

    // Bending toward the normal deflects the ray by (theta1 - theta2); over a
    // vertical drop of `height` that becomes a horizontal offset.
    const offset = height * Math.tan(theta1 - theta2) * Math.sign(slope);

    magnitudes[i] = offset;
    const abs = Math.abs(offset);
    if (abs > max) max = abs;
  }

  return { magnitudes, slopes, max };
}

const sampleField = (field: Float32Array, x: number) => {
  const pos = clamp01(x) * (LUT_SAMPLES - 1);
  const i = Math.floor(pos);
  if (i >= LUT_SAMPLES - 1) return field[LUT_SAMPLES - 1];
  const t = pos - i;
  return field[i] * (1 - t) + field[i + 1] * t;
};

/**
 * Signed distance to a rounded rectangle plus its outward unit normal.
 * Negative distance is inside. Solved analytically rather than by sampling so
 * the normal stays exact right into the corners.
 */
function roundedRectField(
  px: number,
  py: number,
  halfW: number,
  halfH: number,
  radius: number,
) {
  const sx = px < 0 ? -1 : 1;
  const sy = py < 0 ? -1 : 1;
  const qx = Math.abs(px) - halfW + radius;
  const qy = Math.abs(py) - halfH + radius;

  if (qx > 0 && qy > 0) {
    // Corner arc.
    const len = Math.hypot(qx, qy) || 1;
    return {
      distance: len - radius,
      nx: (sx * qx) / len,
      ny: (sy * qy) / len,
    };
  }
  // Flat edge — whichever axis is closer to its border wins.
  return qx > qy
    ? { distance: qx - radius, nx: sx, ny: 0 }
    : { distance: qy - radius, nx: 0, ny: sy };
}

export type GlassGeometry = {
  /** Border-box size in CSS px. */
  width: number;
  height: number;
  /** Corner radius in CSS px. Clamped to half the shorter side. */
  radius: number;
  /** How far the curved bezel reaches inward, in CSS px. */
  bezel: number;
  /** Peak glass depth in CSS px. Drives how hard the light bends. */
  thickness: number;
  /** Refractive index. 1.5 is window glass; higher bends more. */
  ior: number;
  profile: SurfaceProfile;
  /** Rim light direction in degrees, 0 = from the right, going clockwise. */
  specularAngle: number;
  /** Peak rim alpha, 0-1. */
  specularOpacity: number;
  /** Highlight tightness. Higher keeps the rim thinner. */
  specularSharpness: number;
  /**
   * Gain applied to the highlight before it is clipped at 1. `sharpness`
   * shapes the falloff; this drives the peak into saturation, which widens the
   * rim and gives it a hard bright edge instead of a soft gradient. 1 leaves
   * the pure falloff curve alone.
   */
  specularSaturation: number;
  /**
   * Texture pixels per CSS px. Dropping to 0.5 quarters the cost on large
   * surfaces; the field is smooth enough that it barely shows.
   */
  resolution: number;
};

export type GlassTextures = {
  /** PNG data URL for `<feImage />`. */
  displacementMap: string;
  /** PNG data URL for the CSS rim-light layer. */
  specularMap: string;
  /** The `scale` to hand `<feDisplacementMap />`. */
  scale: number;
};

/** Above this many texture pixels we halve the resolution to stay responsive. */
const RESOLUTION_BUDGET = 420_000;

export function buildGlassTextures(
  geometry: GlassGeometry,
): GlassTextures | null {
  const { width, height, ior, profile } = geometry;
  if (typeof document === "undefined") return null;
  if (!(width > 0) || !(height > 0)) return null;

  const shortSide = Math.min(width, height);
  const radius = Math.max(0, Math.min(geometry.radius, shortSide / 2));
  // A bezel wider than the shape has nowhere to go, and a zero bezel would
  // divide by zero in the slope calculation.
  const bezel = Math.max(0.5, Math.min(geometry.bezel, shortSide / 2));
  const thickness = Math.max(0, geometry.thickness);

  let resolution = Math.max(0.25, geometry.resolution);
  while (width * height * resolution * resolution > RESOLUTION_BUDGET) {
    resolution /= 2;
  }

  const texW = Math.max(1, Math.round(width * resolution));
  const texH = Math.max(1, Math.round(height * resolution));

  const field = traceRadialField(profile, bezel, thickness, ior);

  const displacementCanvas = document.createElement("canvas");
  displacementCanvas.width = texW;
  displacementCanvas.height = texH;
  const dispCtx = displacementCanvas.getContext("2d", { alpha: true });

  const specularCanvas = document.createElement("canvas");
  specularCanvas.width = texW;
  specularCanvas.height = texH;
  const specCtx = specularCanvas.getContext("2d", { alpha: true });

  if (!dispCtx || !specCtx) return null;

  const dispData = dispCtx.createImageData(texW, texH);
  const specData = specCtx.createImageData(texW, texH);
  const disp = dispData.data;
  const spec = specData.data;

  const halfW = width / 2;
  const halfH = height / 2;

  // Grazing light reads as glass; a steep light reads as plastic.
  const elevation = (22 * Math.PI) / 180;
  const azimuth = (geometry.specularAngle * Math.PI) / 180;
  const lz = Math.sin(elevation);
  const lxy = Math.cos(elevation);
  const lx = Math.cos(azimuth) * lxy;
  const ly = Math.sin(azimuth) * lxy;

  // A weaker counter-light on the opposite rim. Real glass picks up light from
  // both sides, and without it the shape looks lit rather than transparent.
  const bx = -lx;
  const by = -ly;
  const counterWeight = 0.45;

  const invMax = field.max > 0 ? 1 / field.max : 0;
  const step = 1 / resolution;

  for (let ty = 0; ty < texH; ty++) {
    // Sample at pixel centres so the two halves stay symmetric.
    const py = (ty + 0.5) * step - halfH;

    for (let tx = 0; tx < texW; tx++) {
      const px = (tx + 0.5) * step - halfW;
      const i = (ty * texW + tx) * 4;

      const { distance, nx, ny } = roundedRectField(px, py, halfW, halfH, radius);
      const inside = -distance;

      if (inside <= 0) {
        // Outside the shape: neutral offset, no highlight.
        disp[i] = NEUTRAL;
        disp[i + 1] = NEUTRAL;
        disp[i + 2] = NEUTRAL;
        disp[i + 3] = 255;
        spec[i + 3] = 0;
        continue;
      }

      const t = inside / bezel;
      const magnitude = sampleField(field.magnitudes, t);

      // Positive magnitude means the ray lands further inside, so we sample
      // along the inward normal — the negated outward normal.
      const dx = -nx * magnitude * invMax;
      const dy = -ny * magnitude * invMax;

      disp[i] = NEUTRAL + dx * ENCODE_RANGE;
      disp[i + 1] = NEUTRAL + dy * ENCODE_RANGE;
      disp[i + 2] = NEUTRAL;
      disp[i + 3] = 255;

      // Rebuild the 3D surface normal: height rises as we move inward, so the
      // screen-space gradient points along the outward normal scaled by slope.
      const slope = sampleField(field.slopes, t);
      const snx = nx * slope;
      const sny = ny * slope;
      const len = Math.hypot(snx, sny, 1) || 1;
      const ux = snx / len;
      const uy = sny / len;
      const uz = 1 / len;

      const key = Math.max(0, ux * lx + uy * ly + uz * lz);
      const fill = Math.max(0, ux * bx + uy * by + uz * lz);
      const falloff =
        Math.pow(key, geometry.specularSharpness) +
        counterWeight * Math.pow(fill, geometry.specularSharpness);
      // Gain then clip. Everything past 1/gain flattens into a solid rim, so
      // the highlight reads as a hard bright edge rather than a soft bloom.
      const intensity = Math.min(1, falloff * geometry.specularSaturation);

      // Feather the outermost pixel so the rim does not alias against the
      // rounded corners.
      const edgeFade = Math.min(1, inside);
      const alpha = clamp01(intensity) * geometry.specularOpacity * edgeFade;

      spec[i] = 255;
      spec[i + 1] = 255;
      spec[i + 2] = 255;
      spec[i + 3] = alpha * 255;
    }
  }

  dispCtx.putImageData(dispData, 0, 0);
  specCtx.putImageData(specData, 0, 0);

  return {
    displacementMap: displacementCanvas.toDataURL("image/png"),
    specularMap: specularCanvas.toDataURL("image/png"),
    // Undo the /255 normalisation the filter applies, so `scale` lands back in
    // real pixels: offset = scale * (channel/255 - 0.5) should equal `max`.
    scale: (field.max * 255) / ENCODE_RANGE,
  };
}

export type BlurRampDirection = "to-bottom" | "to-top";

/**
 * A vertical alpha ramp used to mask a second, heavier blur pass — the trick
 * behind "progressive blur", where a panel goes from nearly clear at one end
 * to fully frosted at the other.
 *
 * Only one pixel wide: it carries no horizontal detail, so `<feImage />`
 * stretches it across the surface for free. The ramp is smoothstepped because
 * a linear one leaves a visible seam where the two blur passes cross over.
 */
export function buildBlurRamp(direction: BlurRampDirection): string | null {
  if (typeof document === "undefined") return null;

  const height = 64;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(1, height);
  for (let y = 0; y < height; y++) {
    const t = y / (height - 1);
    const a = direction === "to-bottom" ? t : 1 - t;
    const eased = a * a * (3 - 2 * a);
    const i = y * 4;
    image.data[i] = 255;
    image.data[i + 1] = 255;
    image.data[i + 2] = 255;
    image.data[i + 3] = Math.round(eased * 255);
  }
  ctx.putImageData(image, 0, 0);

  return canvas.toDataURL("image/png");
}

/** Extra blur radius in px at full progressive strength. */
export const PROGRESSIVE_BLUR_RANGE = 18;

/**
 * Chromium is currently the only engine that renders an SVG filter referenced
 * from `backdrop-filter`. There is no feature query for it — `CSS.supports`
 * happily accepts `url()` in engines that then ignore it — so this is an
 * engine check on purpose, and callers always have a CSS-only fallback.
 */
export function supportsSvgBackdropFilter(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  if (!window.CSS?.supports?.("backdrop-filter", "blur(1px)")) return false;

  const brands = (
    navigator as Navigator & {
      userAgentData?: { brands?: { brand: string }[] };
    }
  ).userAgentData?.brands;

  if (brands?.length) {
    return brands.some((b) => /chromium/i.test(b.brand));
  }

  const ua = navigator.userAgent;
  // CriOS/FxiOS/EdgiOS are WebKit underneath despite their branding.
  if (/CriOS|FxiOS|EdgiOS/.test(ua)) return false;
  return /Chrome\/\d/.test(ua);
}
