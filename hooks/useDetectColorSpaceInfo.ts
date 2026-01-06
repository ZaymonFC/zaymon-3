import { useState, useEffect } from "react";
import {
  detectBestColorSpace,
  getColorSpaceSupport,
} from "../lib/colorSpaceDetection";
import type { Gamut } from "@ch-ui/colors";

export function useDetectColorSpaceInfo() {
  const [colorSpaceInfo, setColorSpaceInfo] = useState<ReturnType<
    typeof getColorSpaceSupport
  > | null>(null);
  const [detectedGamut, setDetectedGamut] = useState<Gamut>("srgb");

  useEffect(() => {
    const info = getColorSpaceSupport();
    setColorSpaceInfo(info);
    setDetectedGamut(detectBestColorSpace());
  }, []);

  return { colorSpaceInfo, detectedGamut };
}
