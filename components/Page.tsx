import { styled } from "../Stitches";

export const Page = styled("div", {
  maxWidth: 780,
  marginLeft: "auto",
  marginRight: "auto",

  paddingInline: "$5",
  paddingBlock: "$4",

  fontSize: 16,

  fontFamily: "Departure Mono",
  color: "white",

  minHeight: "100vh",

  "@bp1": {
    paddingBlock: "$7",
  },
});
