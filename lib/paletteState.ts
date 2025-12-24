import { atomWithStorage } from "jotai/utils";
import { observe } from "jotai-effect";
import type { PaletteShade } from "./colors";

export type PaletteName = "blue" | "gold" | "red" | "aqua";

export const currentPaletteAtom = atomWithStorage<PaletteName>(
  "primary-palette",
  "blue",
);

const PALETTE_SHADES: PaletteShade[] = [
  50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800,
  850, 900, 950,
];

// Update CSS variables to point primary → specified palette
function updatePrimaryCSSVars(paletteName: PaletteName) {
  PALETTE_SHADES.forEach((shade) => {
    const varName = `--colors-primary${shade}`;
    const newValue = `var(--colors-${paletteName}${shade})`;
    document.documentElement.style.setProperty(varName, newValue);
  });
}

// Initialize global observer at module level (client-side only)
// This runs once when the module is imported on the client
if (typeof window !== "undefined") {
  observe((get) => {
    const currentPalette = get(currentPaletteAtom);
    updatePrimaryCSSVars(currentPalette);
  });
}
