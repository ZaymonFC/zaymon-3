import { styled } from "../Stitches";

const TextVariants = { bold: { true: { fontWeight: "bold" } } };

export const Heading = styled("div", {
  fontFamily: "EB Garamond",
  color: "$typeHighlight",
  fontWeight: 700,
  lineHeight: 1.5,
  variants: {
    size: {
      sm: { fontSize: "$3" },
      md: { fontSize: "$4" },
      lg: { fontSize: "$5" },
      xl: { fontSize: "$6" },
      hero: { fontSize: "$7" },
    },
  },
  defaultVariants: { size: "md" },
});

export const Text = styled("p", {
  color: "$typeHighlight",
  fontFamily: "Iosevka SS05, Söhne Mono, menlo, monospace",
  fontSize: "$2",
  fontWeight: "normal",
  variants: {
    ...TextVariants,
  },
});

export const SubText = styled("p", {
  fontFamily: "Iosevka SS05, Söhne Mono, menlo, monospace",
  fontSize: "$1",
  color: "$type",
  variants: {
    ...TextVariants,
  },
});

export const Link = styled("a", {
  fontFamily: "Iosevka SS05, Söhne Mono, menlo, monospace",
  color: "$type",
  "&:hover": {
    color: "$typeHighlight",
  },
  textDecoration: "underline",
  variants: {
    invert: {
      true: { color: "$typeHighlight", "&:hover": { color: "white" } },
    },
  },
});

export const SubLink = styled(Link, {
  fontSize: "$1",
});
