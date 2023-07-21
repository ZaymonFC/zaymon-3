import { styled } from "../Stitches";

export const SketchContainer = styled("div", {
  variants: {
    sketch: {
      circles: {
        marginBlock: "$7",
        height: 220,
      },
      rectangles: {
        marginBottom: "$7",
        height: 280,
      },
    },
  },
});
