import { styled } from "../Stitches";

export const DebugGrid = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  margin: 0,
  pointerEvents: "none",
  backgroundImage: `
    repeating-linear-gradient(rgba(252, 243, 230, 0.05) 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, rgba(252, 243, 230, 0.05) 0 1px, transparent 1px 100%)
  `,
  backgroundSize: "1ch 1.25rem",

  variants: {
    visible: {
      true: {
        display: "block",
      },
      false: {
        display: "none",
      },
    },
    opacity: {
      subtle: {
        backgroundImage: `
          repeating-linear-gradient(rgba(252, 243, 230, 0.03) 0 1px, transparent 1px 100%),
          repeating-linear-gradient(90deg, rgba(252, 243, 230, 0.03) 0 1px, transparent 1px 100%)
        `,
      },
      medium: {
        backgroundImage: `
          repeating-linear-gradient(rgba(252, 243, 230, 0.05) 0 1px, transparent 1px 100%),
          repeating-linear-gradient(90deg, rgba(252, 243, 230, 0.05) 0 1px, transparent 1px 100%)
        `,
      },
      strong: {
        backgroundImage: `
          repeating-linear-gradient(rgba(252, 243, 230, 0.1) 0 1px, transparent 1px 100%),
          repeating-linear-gradient(90deg, rgba(252, 243, 230, 0.1) 0 1px, transparent 1px 100%)
        `,
      },
    },
  },

  defaultVariants: {
    visible: true,
    opacity: "medium",
  },
});
