import { styled } from "../Stitches";

export const SketchContainer = styled("div", {
  overflow: "visible",

  variants: {
    sketch: {
      circles: {
        marginBlock: "$6",
        height: 220,
      },
      rectangles: {
        marginBottom: "$7",
        height: 280,
      },
    },
  },
});
