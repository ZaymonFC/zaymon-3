import { useParallax } from "react-scroll-parallax";
import { styled } from "../Stitches";

const Underneath = styled("div", {
  position: "fixed",
  top: -100,
  left: 0,
  height: "100vh",
  width: "100vw",
  pointerEvents: "none",
});

export const BackgroundNoise = () => {
  const parallax: any = useParallax({ speed: 10 });

  return (
    <Underneath ref={parallax.ref}>
      <div style={{ opacity: 0.06 }}>
        <svg viewBox="0 0 4000 10000" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.29"
              numOctaves="3"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </Underneath>
  );
};
