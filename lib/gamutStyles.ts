import type { Palette, PaletteShade } from "./colors";
import type { SupportedGamut } from "../Stitches";

/**
 * Generates CSS custom properties with media queries for gamut-specific colors
 */
export function generateGamutCSS(
  palettes: Record<SupportedGamut, Palette>,
  prefix: string = "blue",
): string {
  const gamuts: SupportedGamut[] = ["srgb", "p3", "rec2020"];
  const shades = Object.keys(palettes.srgb).map(Number) as PaletteShade[];

  // Generate CSS for each gamut with appropriate media queries
  const cssBlocks = gamuts.map((gamut) => {
    const palette = palettes[gamut];
    const declarations = shades
      .map((shade) => `    --colors-${prefix}${shade}: ${palette[shade]};`)
      .join("\n");

    // sRGB is the baseline (no media query needed)
    if (gamut === "srgb") {
      return `  :root {\n${declarations}\n  }`;
    }

    // P3 and Rec2020 use media queries
    const mediaQuery =
      gamut === "p3"
        ? "@media (color-gamut: p3)"
        : "@media (color-gamut: rec2020)";

    return `  ${mediaQuery} {\n    :root {\n${declarations}\n    }\n  }`;
  });

  return cssBlocks.join("\n\n");
}
