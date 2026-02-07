import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { styled } from "../Stitches";

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  backgroundColor: "$type",
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },
});

export const Separator = StyledSeparator;
