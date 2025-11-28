import { styled } from "../Stitches";

export const GlassSection = styled("div", {
  backdropFilter: "blur(20px)",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: "$3",
  padding: "$5",
  marginBottom: "$6",
  backgroundImage: `
    linear-gradient(rgba(241, 175, 93, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(241, 175, 93, 0.02) 1px, transparent 1px)
  `,
  backgroundSize: "14px 14px",
  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.03), inset 0 -1px 1px rgba(255, 255, 255, 0.03)",

  "@media (max-width: 639px)": {
    borderRadius: 0,
    marginLeft: "-$5",
    marginRight: "-$5",
    width: "calc(100% + 32px)",
  },

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
