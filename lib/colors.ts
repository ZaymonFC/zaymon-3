import {
  helicalArcFromConfig,
  constellationFromHelicalArc,
  getOklabVectorsFromLuminosities,
  oklabVectorToValue,
  type Gamut,
  type HelicalArcConfig
} from '@ch-ui/colors';

export type PaletteShade = 50 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500 | 550 | 600 | 650 | 700 | 750 | 800 | 850 | 900 | 950;

export type Palette = Record<PaletteShade, string>;

export interface PaletteConfig {
  lightness: number;
  chroma: number;
  hue: number;
  lowerCp?: number;
  upperCp?: number;
  torsion?: number;
  gamut?: Gamut;
}

/**
 * Generates a perceptually uniform color palette using helical arc interpolation
 * @param config - Palette configuration
 * @returns Object mapping shade numbers to CSS color strings
 */
export function generatePalette(config: PaletteConfig): Palette {
  const {
    lightness,
    chroma,
    hue,
    lowerCp = 1,
    upperCp = 1,
    torsion = 0,
    gamut = 'p3'
  } = config;

  // Configuration for the palette arc
  const helicalConfig: HelicalArcConfig = {
    keyPoint: [lightness, chroma, hue],
    lowerCp,
    upperCp,
    torsion,
  };

  // Shade numbers we want to generate
  const shadeNumbers: PaletteShade[] = [
    50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
    550, 600, 650, 700, 750, 800, 850, 900, 950
  ];

  // Convert shade numbers to luminosity values (0-1 range)
  // Formula: L = (1000 - shade) / 1000
  // So shade 50 → L=0.95 (very light), shade 950 → L=0.05 (very dark)
  const luminosities = shadeNumbers.map(shade => (1000 - shade) / 1000);

  // Generate the helical arc
  const arc = helicalArcFromConfig(helicalConfig);

  // Create a constellation (full curve with many interpolated points)
  const constellation = constellationFromHelicalArc(arc, 32);

  // Get oklab vectors at our specific luminosity values
  const oklabVectors = getOklabVectorsFromLuminosities(luminosities, constellation);

  // Convert to CSS color strings and build the palette object
  const palette = {} as Palette;
  shadeNumbers.forEach((shade, index) => {
    const oklabVector = oklabVectors[index];
    palette[shade] = oklabVectorToValue(oklabVector, gamut);
  });

  return palette;
}

/**
 * Maps a palette to color tokens with a given prefix
 * @param palette - The generated palette object
 * @param prefix - The token prefix (e.g., 'blue', 'purple')
 * @returns Object mapping token names to CSS color strings
 * @example
 * const bluePalette = generatePalette(config);
 * const tokens = paletteToTokens(bluePalette, 'blue');
 * // Returns: { blue50: "...", blue100: "...", ... blue950: "..." }
 */
export function paletteToTokens(palette: Palette, prefix: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(palette).map(([shade, color]) => [`${prefix}${shade}`, color])
  );
}
