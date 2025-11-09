import { styled } from "../Stitches";

export const GlassSection = styled("div", {
  backdropFilter: "blur(20px)",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: "$3",
  padding: "$5",
  marginBottom: "$6",

  variants: {
    spacing: {
      sm: { padding: "$3", marginBottom: "$4" },
      md: { padding: "$5", marginBottom: "$6" },
      lg: { padding: "$6", marginBottom: "$7" },
    },
  },

  defaultVariants: {
    spacing: "md",
  },
});
