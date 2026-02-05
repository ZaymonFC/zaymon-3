import { generatePalette, type Palette } from "./colors";

export type SupportedGamut = "srgb" | "p3" | "rec2020";

export type PaletteConfig = {
  lightness: number;
  chroma: number;
  hue: number;
  lowerCp?: number;
  upperCp?: number;
  torsion?: number;
};

/**
 * Creates a palette across all supported gamuts
 * @param config - Base palette configuration
 * @returns Object mapping each gamut to its corresponding palette
 */
export function makePalette(
  config: PaletteConfig,
): Record<SupportedGamut, Palette> {
  return {
    srgb: generatePalette({ ...config, gamut: "srgb" }),
    p3: generatePalette({ ...config, gamut: "p3" }),
    rec2020: generatePalette({ ...config, gamut: "rec2020" }),
  };
}

export const bluePaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 281,
  lowerCp: 1,
  upperCp: 0.4,
  torsion: -12,
};

export const goldPaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 82,
  lowerCp: 1,
  upperCp: 0.4,
  torsion: -12,
} as const;

export const redPaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 27,
  lowerCp: 1,
  upperCp: 0.4,
  torsion: -12,
} as const;

export const magentaPaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 300,
  lowerCp: 1,
  upperCp: 0.4,
  torsion: -12,
};

export const greenPaletteConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 158,
  lowerCp: 1,
  upperCp: 0.4,
  torsion: -12,
};

// export const indigoPaletteConfig = {
//   lightness: 0.43,
//   chroma: 0.4,
//   hue: 223,
//   lowerCp: 1,
//   upperCp: 0.4,
//   torsion: -12,
// };

// Generate palettes for all gamuts
export const bluePalettes = makePalette(bluePaletteConfig);
export const goldPalettes = makePalette(goldPaletteConfig);
export const redPalettes = makePalette(redPaletteConfig);
export const magentaPalettes = makePalette(magentaPaletteConfig);
export const greenPalettes = makePalette(greenPaletteConfig);
// export const indigoPalettes = makePalette(indigoPaletteConfig);

// Available themes for cycling
export interface ThemePreset {
  name: string;
  config: PaletteConfig;
}

export const availableThemes: ThemePreset[] = [
  { name: "Blue", config: bluePaletteConfig },
  { name: "Gold", config: goldPaletteConfig },
  { name: "Red", config: redPaletteConfig },
  { name: "Magenta", config: magentaPaletteConfig },
  { name: "Green", config: greenPaletteConfig },
  // { name: "Indigo", config: indigoPaletteConfig },
];
