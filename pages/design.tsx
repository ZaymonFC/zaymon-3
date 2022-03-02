import { Panel } from "./index";
import Padding from "../components/Padding";
import { BackgroundNoise } from "../components/BackgroundNoise";
import { Page } from "../components/Page";
import Stack from "../components/Stack";
import { Heading, SubText, Text } from "../components/Typography";
import { styled } from "../Stitches";
import { Separator } from "../components/Separator";
import React from "react";
import Badge from "../components/Badge";

const VSpacer = styled("div", {
  margin: 0,
  padding: 0,
  variants: {
    size: {
      xs: { height: 4 },
      sm: { height: 8 },
      md: { height: 16 },
      lg: { height: 24 },
      xl: { height: 32 },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Typography = () => (
  <div>
    <Heading size="hero">Big-Boss</Heading>
    <Heading size="xl">Mini-Boss</Heading>
    {/* <Heading size="md">Subtitle</Heading> */}
    <Heading size="lg">Heading 1</Heading>
    <Heading size="md">Heading 2</Heading>
    <Heading size="sm">Heading 3</Heading>
    <Text>Paragraph</Text>
    <SubText>Small</SubText>
  </div>
);

const DesignRoot = () => {
  return (
    <Page>
      <BackgroundNoise />
      <VSpacer size="lg" />
      <Stack direction="column">
        <div>Typography.</div>
        <Separator />
        <Typography />
        <VSpacer size="xs" />
        <Text>Panels.</Text>
        <Separator />
        <VSpacer size="xs" />
        <Panel shadow="lg">
          <Padding>
            <Heading size="xl">Title</Heading>
          </Padding>
        </Panel>
        <VSpacer size="xs" />
        <Text>Components.</Text>
        <Separator />
        <VSpacer size="sm" />

        <Stack spacing="sm" align="center">
          <Badge>Badge</Badge>
          <Badge>Badge</Badge>
          <Badge>Badge</Badge>
        </Stack>

        <VSpacer size="xs" />
        <Text>Composites.</Text>
        <Separator />
        <VSpacer size="sm" />
      </Stack>
    </Page>
  );
};
export default DesignRoot;
