import { styled } from "../Stitches";

const childWithGap = "> * + *";

// Originally yoinked from https://codesandbox.io/s/stitches-stack-demo-lr2nj
const Stack = styled("div", {
  display: "flex",

  variants: {
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      spaceBetween: { justifyContent: "space-between" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
    spacing: {
      none: {},
      sm: {
        gap: "$space$4",
      },
      md: {
        gap: "$space$5",
      },
      lg: {
        gap: "$space$6",
      },
      xl: {
        gap: "$space$7",
      },
    },
    direction: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
      "row-reverse": {
        flexDirection: "row-reverse",
      },
      "column-reverse": {
        flexDirection: "column-reverse",
      },
    },
  },
  defaultVariants: {
    direction: "row",
    spacing: "md",
    justify: "start",
  },
});

export default Stack;
