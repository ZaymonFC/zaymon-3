import { useState, useEffect } from "react";
import { detectBestColorSpace } from "../lib/colorSpaceDetection";
import { styled } from "../Stitches";
import type { SupportedGamut } from "../Stitches";

const Indicator = styled("div", {
  position: "fixed",
  bottom: "$4",
  right: "$4",
  padding: "$3 $4",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "$3",
  fontFamily: "$mono",
  fontSize: "$1",
  color: "white",
  zIndex: 9999,
  pointerEvents: "none",
  opacity: 0,
  animation: "fadeIn 0.3s ease-in-out forwards",

  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

const Label = styled("span", {
  color: "rgba(255, 255, 255, 0.6)",
  marginRight: "$2",
});

const Value = styled("span", {
  fontWeight: "bold",
  color: "#4CAF50",
  textTransform: "uppercase",
});

export function GamutIndicator() {
  const [gamut, setGamut] = useState<SupportedGamut | null>(null);

  useEffect(() => {
    const detected = detectBestColorSpace();
    setGamut(detected);

    // Hide after 5 seconds
    const timer = setTimeout(() => {
      const indicator = document.getElementById("gamut-indicator");
      if (indicator) {
        indicator.style.opacity = "0";
        indicator.style.transition = "opacity 0.3s ease-in-out";
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!gamut) return null;

  return (
    <Indicator id="gamut-indicator">
      <Label>Color Space:</Label>
      <Value>{gamut}</Value>
    </Indicator>
  );
}
