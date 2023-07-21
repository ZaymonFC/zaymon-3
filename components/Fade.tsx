import { keyframes, styled } from "../Stitches";

const fadeInKeyframes = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const Fade = styled("div", {
  animation: `${fadeInKeyframes} 1s ease-in-out`,

  variants: {
    duration: {
      short: {
        animation: `${fadeInKeyframes} 0.2s ease-in-out`,
      },
      medium: {
        animation: `${fadeInKeyframes} 0.5s ease-in-out`,
      },
      long: {
        animation: `${fadeInKeyframes} 1s ease-in-out`,
      },
    },
  },

  defaultVariants: {
    duration: "short",
  },
});
