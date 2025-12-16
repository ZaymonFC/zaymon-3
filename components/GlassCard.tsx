import { styled } from "../Stitches";
import * as React from "react";

// Styled components
const CardRoot = styled("fieldset", {
  position: "relative",
  marginBottom: "$6",
  padding: "$5",
  display: "block",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "calc(-12px - 1px)",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(100, 100, 255)",
    backdropFilter: "blur(10px)",
    mixBlendMode: "difference",
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.9,
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: "calc(-12px - 1px)",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(240, 240, 250, 0.78)",
    pointerEvents: "none",
    zIndex: 0,
  },

  "@media (max-width: 639px)": {
    marginLeft: "-$5",
    marginRight: "-$5",
    width: "calc(100% + 32px)",
  },

  variants: {
    borderStyle: {
      single: {
        border: "2px solid $typeHighlight",
      },
      double: {
        border: "2px double $typeHighlight",
      },
    },
  },

  defaultVariants: {
    borderStyle: "single",
  },
});

const CardLegend = styled("legend", {
  fontFamily: "Iosevka SS05, Söhne Mono, menlo, monospace",
  fontSize: "$2",
  fontWeight: 400,
  color: "#fcf3e6",
  textTransform: "uppercase",
  letterSpacing: "2px",
  padding: "0 1ch",
  position: "relative",
  zIndex: 1,
  border: "2px solid $typeHighlight",
  backgroundColor: "$typeHighlight",
});

const ContentWrapper = styled("div", {
  position: "relative",
  zIndex: 1,
});

// Component
interface GlassCardProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, "title"> {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  mode?: "left" | "right" | "default";
  borderStyle?: "single" | "double";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  mode = "default",
  title,
  borderStyle = "single",
  style,
  ...rest
}) => {
  return (
    <CardRoot borderStyle={borderStyle} style={style} {...rest}>
      {title && <CardLegend>{title}</CardLegend>}
      <ContentWrapper>{children}</ContentWrapper>
    </CardRoot>
  );
};
