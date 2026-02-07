import { styled } from "../Stitches";
import * as React from "react";
import { Button } from "./Button";

const ActionBarRoot = styled("div", {
  display: "flex",
  gap: "$3",
  width: "100%",
});

const ActionButton = styled(Button, {
  variants: {
    isSelected: {
      true: {
        background: "$type",
        color: "$background",
      },
    },
  },
});

interface ActionBarItem {
  body: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  theme?: "PRIMARY" | "SECONDARY";
  disabled?: boolean;
}

interface ActionBarProps {
  items: ActionBarItem[];
}

export const ActionBar: React.FC<ActionBarProps> = ({ items }) => {
  return (
    <ActionBarRoot>
      {items.map((item, index) => (
        <ActionButton
          key={index}
          onClick={item.onClick}
          theme={item.theme || "SECONDARY"}
          isDisabled={item.disabled}
          isSelected={item.selected}
        >
          {item.body}
        </ActionButton>
      ))}
    </ActionBarRoot>
  );
};
