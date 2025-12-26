import { createStitches } from "@stitches/react";
import { generatePalette, paletteToTokens, type Palette } from "./lib/colors";

export type SupportedGamut = "srgb" | "p3" | "rec2020";

const bluePaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 281,
  lowerCp: 1,
  upperCp: 1,
  torsion: -12,
} as const;

const goldPaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 82,
  lowerCp: 1,
  upperCp: 1,
  torsion: -12,
} as const;

const redPaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 27,
  lowerCp: 1,
  upperCp: 1,
  torsion: -12,
} as const;

const bluePalettes: Record<SupportedGamut, Palette> = {
  srgb: generatePalette({ ...bluePaletteConfig, gamut: "srgb" }),
  p3: generatePalette({ ...bluePaletteConfig, gamut: "p3" }),
  rec2020: generatePalette({ ...bluePaletteConfig, gamut: "rec2020" }),
};

const goldPalettes: Record<SupportedGamut, Palette> = {
  srgb: generatePalette({ ...goldPaletteConfig, gamut: "srgb" }),
  p3: generatePalette({ ...goldPaletteConfig, gamut: "p3" }),
  rec2020: generatePalette({ ...goldPaletteConfig, gamut: "rec2020" }),
};

const redPalettes: Record<SupportedGamut, Palette> = {
  srgb: generatePalette({ ...redPaletteConfig, gamut: "srgb" }),
  p3: generatePalette({ ...redPaletteConfig, gamut: "p3" }),
  rec2020: generatePalette({ ...redPaletteConfig, gamut: "rec2020" }),
};

// Use P3 as the default palette (will be overridden by media queries in CSS)
const bluePalette = bluePalettes.p3;
const goldPalette = goldPalettes.p3;
const redPalette = redPalettes.p3;

export { bluePalettes, goldPalettes, redPalettes };

const shadows = {
  1: `
      0.2px 0.2px 0.3px hsl($colors$shadowColor / 0.67),
      0.8px 0.9px 1.2px -3.3px hsl($colors$shadowColor / 0.51)
    `,

  2: `
      0.2px 0.2px 0.3px hsl($colors$shadowColor / 0.93),
      4px 4.5px 6.1px -3.3px hsl($colors$shadowColor / 0.71)
      `,

  3: `
      0.2px 0.2px 0.3px hsl($colors$shadowColor / 0.87),
      2.1px 2.3px 3.1px -1.1px hsl($colors$shadowColor / 0.76),
      7.2px 7.9px 10.7px -2.2px hsl($colors$shadowColor / 0.66),
      20px 22px 29.9px -3.3px hsl($colors$shadowColor / 0.55)
      `,
};

const physicalColors = {
  ...paletteToTokens(bluePalette, "blue"),
  ...paletteToTokens(goldPalette, "gold"),
  ...paletteToTokens(redPalette, "red"),
  ...paletteToTokens(bluePalette, "primary"),

  gray500: "hsl(206,10%,76%)",
  purple500: "hsl(252,78%,60%)",
  green500: "hsl(148,60%,60%)",
  red500: "hsl(352,100%,62%)",
  orange: "#ffaa48",

  // Utility colors
  cream: "#fcf3e6",
  shadowBase: "254deg 38% 3%",
} as const;

const semanticColors = {
  background: "$primary950",
  type: "$primary800",
  typeHighlight: "$primary600",
  legendTitle: "$primary50",
  shadowColor: "$shadowBase",
} as const;

const colors = {
  ...physicalColors,
  ...semanticColors,
} as const;

export const { styled, css, getCssText, keyframes } = createStitches({
  theme: {
    colors,
    space: {
      1: "1px",
      2: "2px",
      3: "4px",
      4: "8px",
      5: "16px",
      6: "24px",
      7: "48px",
      8: "64px",
    },
    fontSizes: {
      1: "0.8em",
      2: "1em",
      3: "1.2em",
      4: "1.4em",
      5: "1.6em",
      6: "2.2em",
      7: "4.5em",
    },
    fonts: {
      mono: "Söhne Mono, menlo, monospace",
      serif: "Georgia, 'Times New Roman', Times, serif",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {
      1: "1px",
      2: "2px",
      3: "4px",
    },
    borderStyles: {},
    radii: {
      1: "1px",
      2: "2px",
      3: "4px",
      4: "8px",
      5: "12px",
      6: "16px",
      7: "24px",
    },
    shadows: shadows,
    zIndices: {},
    transitions: {},
  },
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
  },
  utils: {
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});
