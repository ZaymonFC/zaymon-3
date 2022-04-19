import { useMemo } from "react";
import { useParallax } from "react-scroll-parallax";
import useWindowDimensions from "../hooks/useWindowSize";
import { styled } from "../Stitches";

const Underneath = styled("div", {
  position: "fixed",
  top: -80, // Account for parallax
  left: 0,
  pointerEvents: "none",

  svg: {
    height: "120vh", // Account for parallax
    width: "100vw",
  },
});

const mapWidthToNoiseFreq = (width: number) => {
  const data = [
    { bp: 0, value: 0.08 },
    { bp: 400, value: 0.1 },
    { bp: 800, value: 0.12 },
    { bp: 1200, value: 0.2 },
    { bp: 2000, value: 0.2 },
  ];

  const { value, bp } =
    data.reverse().find((n) => width >= n.bp) || data[data.length - 1];

  return value;
};

export const BackgroundNoise = () => {
  const parallax: any = useParallax({ speed: 5 });

  const { width } = useWindowDimensions();
  const baseFreq = useMemo(() => mapWidthToNoiseFreq(width), [width]);

  return (
    <Underneath ref={parallax.ref}>
      <div style={{ opacity: 0.06 }}>
        <svg
          viewBox="0 0 5000 5000"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${baseFreq}`}
              numOctaves="3"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </Underneath>
  );
};
