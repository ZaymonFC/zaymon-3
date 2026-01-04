import React from "react";
import { styled } from "../Stitches";
import NextLink from "next/link";

const legendButtonStyles = {
  fontFamily: "$mono",
  fontSize: "$2",
  fontWeight: 400,
  color: "$legendTitle",
  textTransform: "uppercase",
  letterSpacing: "2px",
  padding: "0 1ch",
  border: "2px solid $typeHighlight",
  backgroundColor: "$typeHighlight",
  cursor: "pointer",
  transition: "200ms ease all",
  textDecoration: "none",
  display: "inline-block",

  "&:hover": {
    opacity: 0.8,
  },
};

const StyledButton = styled("button", legendButtonStyles);

const StyledLink = styled("a", legendButtonStyles);

const FixedContainer = styled("div", {
  position: "fixed",
  zIndex: 1000,

  variants: {
    position: {
      topLeft: {
        top: "$4",
        left: "$4",
      },
      topRight: {
        top: "$4",
        right: "$4",
      },
      bottomLeft: {
        bottom: "$4",
        left: "$4",
      },
      bottomRight: {
        bottom: "$4",
        right: "$4",
      },
    },
  },
  defaultVariants: {
    position: "topLeft",
  },
});

interface LegendButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  fixed?: boolean;
}

export const LegendButton: React.FC<LegendButtonProps> = ({
  children,
  onClick,
  href,
  position = "topLeft",
  fixed = false,
}) => {
  const button = href ? (
    <NextLink href={href} passHref legacyBehavior>
      <StyledLink>{children}</StyledLink>
    </NextLink>
  ) : (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  );

  if (fixed) {
    return <FixedContainer position={position}>{button}</FixedContainer>;
  }

  return button;
};
