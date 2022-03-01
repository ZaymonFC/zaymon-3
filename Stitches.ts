import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  theme: {
    colors: {
      gray500: "hsl(206,10%,76%)",
      blue500: "hsl(206,100%,50%)",
      purple500: "hsl(252,78%,60%)",
      green500: "hsl(148,60%,60%)",
      red500: "hsl(352,100%,62%)",
      orange: "#ffaa48",
    },
    space: {
      1: "1px",
      2: "2px",
      3: "4px",
      4: "8px",
      5: "16px",
      6: "24px",
      7: "48px",
      8: "64px",
    },
    fontSizes: {
      1: "0.8em",
      2: "1em",
      3: "1.2em",
      4: "1.4em",
      5: "1.6em",
      6: "2.2em",
      7: "4em",
    },
    fonts: {
      mono: "Söhne Mono, menlo, monospace",
      serif: "Georgia, 'Times New Roman', Times, serif",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {
      1: "1px",
      2: "2px",
      3: "4px",
    },
    borderStyles: {},
    radii: {
      1: "1px",
      2: "2px",
      3: "4px",
      4: "8px",
      5: "12px",
      6: "16px",
      7: "24px",
    },
    shadows: {
      $$shadow: "254deg 47% 1%",
      1: "0.3px 0.5px 0.7px hsl($$shadow / 0.32), 0.5px 0.7px 1px -1.2px hsl($$shadow / 0.32), 1.2px 1.8px 2.4px -2.5px hsl($$shadow / 0.32)",
      2: "0.3px 0.5px 0.7px hsl($$shadow / 0.34), 1px 1.5px 2px -0.8px hsl($$shadow / 0.34), 2.4px 3.6px 4.9px -1.7px hsl($$shadow / 0.34), 5.8px 8.8px 11.9px -2.5px hsl($$shadow / 0.34)",
      3: "0.3px 0.5px 0.7px hsl($$shadow / 0.31), 1.7px 2.5px 3.4px -0.4px hsl($$shadow / 0.31), 3.1px 4.7px 6.3px -0.7px hsl($$shadow / 0.31), 5.1px 7.7px 10.4px -1.1px hsl($$shadow / 0.31), 8.1px 12.3px 16.6px -1.4px hsl($$shadow / 0.31), 12.6px 19.2px 25.8px -1.8px hsl($$shadow / 0.31), 19.2px 29.1px 39.2px -2.1px hsl($$shadow / 0.31), 28.3px 42.9px 57.8px -2.5px hsl($$shadow / 0.31)",
    },
    zIndices: {},
    transitions: {},
  },
  utils: {
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});
