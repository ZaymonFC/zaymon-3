import { atom } from "jotai";
import type { Gamut } from "@ch-ui/colors";

export interface PalettePlaygroundConfig {
  lightness: number;
  chroma: number;
  hue: number;
  lowerCp: number;
  upperCp: number;
  torsion: number;
  gamut: Gamut;
}

export const defaultPlaygroundConfig: PalettePlaygroundConfig = {
  lightness: 0.43,
  chroma: 0.4,
  hue: 276,
  lowerCp: 1,
  upperCp: 1,
  torsion: -12,
  gamut: "p3",
};

export const palettePlaygroundAtom = atom<PalettePlaygroundConfig>(
  defaultPlaygroundConfig,
);
