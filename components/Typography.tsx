import { styled } from "../Stitches";

export const Heading = styled("div", {
  fontFamily: "EB Garamond",
  color: "$orange",
  fontSize: 90,
  lineHeight: "1.2em",
  variants: {
    size: {
      xs: { fontSize: "$1" },
      sm: { fontSize: "$3" },
      md: { fontSize: "$4" },
      lg: { fontSize: "$5" },
      xl: { fontSize: "$6" },
      hero: { fontSize: 74 }, // TODO: Refactor
    },
  },
  defaultVariants: { size: "md" },
});

const paragraphFontSizeVariants = {
  fontSize: {
    xs: { fontSize: "$1" },
    sm: { fontSize: "$2" },
    md: { fontSize: "$3" },
    lg: { fontSize: "$4" },
    xl: { fontSize: "$5" },
  },
};

export const Text = styled("p", {
  color: "white",
  fontSize: "1.2rem",
  fontFamily: "Iosevka SS05",
  variants: { ...paragraphFontSizeVariants },
});

export const Link = styled("a", {
  color: "white",
  "&:hover": {
    color: "$orange",
  },
  variants: { ...paragraphFontSizeVariants },
});
