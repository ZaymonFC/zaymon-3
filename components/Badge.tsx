import { styled } from "../Stitches";
import Padding from "./Padding";
import { SubText } from "./Typography";

const Border = styled("div", {
  borderStyle: "solid",
  borderColor: "$orange",

  variants: {
    size: {
      sm: { borderWidth: "$1" },
      md: { borderWidth: "$2" },
      lg: { borderWidth: "$3" },
    },
    rounded: {
      sm: { borderRadius: "$1" },
      md: { borderRadius: "$2" },
      lg: { borderRadius: "$3" },
    },
  },
  defaultVariants: { size: "sm" },
});

const BoxShadow = styled("div", {
  variants: {
    size: {
      sm: { boxShadow: "$1" },
      md: { boxShadow: "$2" },
      lg: { boxShadow: "$3" },
    },
  },
  defaultVariants: { size: "md" },
});

const BadgeContainer = styled("div", {
  width: "fit-content",
});

const Badge = ({ children }: { children: React.ReactNode }) => (
  <BadgeContainer>
    <Border rounded="md">
      <Padding size="md" constraint="inline">
        <SubText>{children}</SubText>
      </Padding>
    </Border>
  </BadgeContainer>
);

const StyledBadge = styled(Badge, {
  display: "inline-block",
});

export default StyledBadge;
