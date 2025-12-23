import type { SupportedGamut } from "../Stitches";

/**
 * Checks if the browser AND display support a color gamut
 * This uses the same detection as CSS @media (color-gamut) queries
 */
function supportsGamut(gamut: SupportedGamut): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return gamut === "srgb";
  }

  try {
    // Match exactly what CSS @media queries use
    return window.matchMedia(`(color-gamut: ${gamut})`).matches;
  } catch {
    return gamut === "srgb";
  }
}

/**
 * Detects the best supported color space/gamut for the current browser
 * Priority order: rec2020 > p3 > srgb
 * Uses matchMedia - the same method CSS @media queries use
 *
 * @returns The best supported gamut identifier
 */
export function detectBestColorSpace(): SupportedGamut {
  if (supportsGamut("rec2020")) return "rec2020";
  if (supportsGamut("p3")) return "p3";
  return "srgb";
}

/**
 * Gets detailed information about color space support
 */
export function getColorSpaceSupport() {
  return {
    rec2020: supportsGamut("rec2020"),
    p3: supportsGamut("p3"),
    srgb: supportsGamut("srgb"),
    best: detectBestColorSpace(),
  };
}

/**
 * Logs the detected color space to console
 */
export function logColorSpaceInfo() {
  if (typeof window === "undefined") return;

  const support = getColorSpaceSupport();
  const best = support.best;

  console.group("🎨 Color Space Detection");
  console.log(
    `%cActive gamut: ${best.toUpperCase()}`,
    "font-weight: bold; font-size: 14px; color: #4CAF50",
  );
  console.log("");

  console.table({
    "Rec. 2020": support.rec2020 ? "✓ Supported" : "✗ Not supported",
    "Display P3": support.p3 ? "✓ Supported" : "✗ Not supported",
    sRGB: support.srgb ? "✓ Supported" : "✗ Not supported",
  });

  console.log(
    `%cℹ️ CSS automatically uses ${best} via @media (color-gamut: ${best})`,
    "color: #888; font-style: italic",
  );
  console.groupEnd();
}
