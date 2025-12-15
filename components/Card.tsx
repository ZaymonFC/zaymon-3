import { styled } from "../Stitches";
import * as React from "react";

// Styled components
const CardRoot = styled("article", {
  display: "block",
});

const CardHeader = styled("header", {
  display: "flex",
  alignItems: "center",
  gap: "2ch",
  boxShadow: "inset 2px 0 0 0 $colors$type, inset -2px 0 0 0 $colors$type, inset 0 2px 0 0 $colors$type",
  padding: "0 2ch",
  minHeight: "calc(1.25 * 2em)",
  lineHeight: "calc(1.25 * 2em)",
});

const DecorativeLeft = styled("div", {
  flex: 0,
  variants: {
    hasCorner: {
      true: {
        boxShadow: "inset 2px 0 0 0 $colors$type, inset 0 2px 0 0 $colors$type",
        width: "2ch",
      },
      false: {
        flex: 1,
      },
    },
  },
});

const DecorativeRight = styled("div", {
  flex: 1,
  variants: {
    hasCorner: {
      true: {
        boxShadow: "inset -2px 0 0 0 $colors$type, inset 0 2px 0 0 $colors$type",
        width: "2ch",
      },
    },
  },
});

const CardTitle = styled("h2", {
  fontFamily: "$mono",
  fontSize: "$2",
  fontWeight: 400,
  margin: 0,
  color: "$type",
  textTransform: "uppercase",
  letterSpacing: "1px",
  whiteSpace: "nowrap",
});

const CardChildren = styled("section", {
  boxShadow: "inset 2px 0 0 0 $colors$type, inset -2px 0 0 0 $colors$type, inset 0 -2px 0 0 $colors$type",
  padding: "calc(1.25 * 0.5rem) 2ch calc(1.25 * 1rem) 2ch",
});

// Component
interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  mode?: "left" | "right" | "default";
}

export const Card: React.FC<CardProps> = ({
  children,
  mode = "default",
  title,
  style,
  ...rest
}) => {
  let titleElement;

  if (mode === "left") {
    titleElement = (
      <CardHeader>
        <DecorativeLeft hasCorner aria-hidden="true" />
        {title && <CardTitle>{title}</CardTitle>}
        <DecorativeRight aria-hidden="true" />
      </CardHeader>
    );
  } else if (mode === "right") {
    titleElement = (
      <CardHeader>
        <DecorativeLeft aria-hidden="true" />
        {title && <CardTitle>{title}</CardTitle>}
        <DecorativeRight hasCorner aria-hidden="true" />
      </CardHeader>
    );
  } else {
    titleElement = (
      <CardHeader>
        <DecorativeLeft hasCorner={false} aria-hidden="true" />
        {title && <CardTitle>{title}</CardTitle>}
        <DecorativeLeft hasCorner={false} aria-hidden="true" />
      </CardHeader>
    );
  }

  return (
    <CardRoot style={style} {...rest}>
      {titleElement}
      <CardChildren>{children}</CardChildren>
    </CardRoot>
  );
};
