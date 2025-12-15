import { styled } from "../Stitches";
import * as React from "react";

const ButtonBase = styled("button", {
  display: "inline-block",
  verticalAlign: "top",
  fontWeight: 400,
  textAlign: "center",
  width: "100%",
  fontFamily: "$mono",
  fontSize: "$2",
  lineHeight: "calc(1.25 * 2em)",
  minHeight: "calc(1.25 * 2em)",
  padding: "0 2ch",
  textTransform: "uppercase",
  letterSpacing: "1px",
  transition: "200ms ease all",
  border: "none",
  cursor: "pointer",

  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  variants: {
    theme: {
      PRIMARY: {
        background: "$type",
        color: "$background",

        "&:hover:not(:disabled)": {
          background: "$typeHighlight",
          color: "$background",
        },
      },
      SECONDARY: {
        background: "transparent",
        color: "$type",
        boxShadow: "inset 0 0 0 1px $colors$type",

        "&:hover:not(:disabled)": {
          background: "$type",
          color: "$background",
          boxShadow: "inset 0 0 0 1px transparent",
        },
      },
    },
  },

  defaultVariants: {
    theme: "PRIMARY",
  },
});

const DisabledDiv = styled("div", {
  display: "inline-block",
  verticalAlign: "top",
  fontWeight: 400,
  textAlign: "center",
  width: "100%",
  fontFamily: "$mono",
  fontSize: "$2",
  lineHeight: "calc(1.25 * 2em)",
  minHeight: "calc(1.25 * 2em)",
  padding: "0 2ch",
  textTransform: "uppercase",
  letterSpacing: "1px",
  cursor: "not-allowed",
  opacity: 0.5,

  variants: {
    theme: {
      PRIMARY: {
        background: "$type",
        color: "$background",
      },
      SECONDARY: {
        background: "transparent",
        color: "$type",
        boxShadow: "inset 0 0 0 1px $colors$type",
      },
    },
  },

  defaultVariants: {
    theme: "PRIMARY",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "PRIMARY" | "SECONDARY";
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  theme = "PRIMARY",
  isDisabled,
  children,
  ...rest
}) => {
  if (isDisabled) {
    return <DisabledDiv theme={theme}>{children}</DisabledDiv>;
  }

  return (
    <ButtonBase theme={theme} role="button" tabIndex={0} disabled={isDisabled} {...rest}>
      {children}
    </ButtonBase>
  );
};
