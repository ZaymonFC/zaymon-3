import { Padding, Panel } from "./index";
import { BackgroundNoise } from "../components/BackgroundNoise";
import { Page } from "../components/Page";
import Stack from "../components/Stack";
import { Heading, SubText, Text } from "../components/Typography";
import { styled } from "../Stitches";

const VSpacer = styled("div", {
  height: 24,
  variants: {
    size: {
      sm: { height: 8 },
      md: {},
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const DesignRoot = () => {
  return (
    <Page>
      <BackgroundNoise />
      <VSpacer />
      <Stack direction="column">
        <div>Typography.</div>
        <Heading size="hero">Hero</Heading>
        <Heading size="xl">Title</Heading>
        <Heading size="md">Subtitle</Heading>
        <Heading size="lg">Heading 1</Heading>
        <Heading size="md">Heading 2</Heading>
        <Heading size="sm">Heading 3</Heading>
        <Text>Paragraph</Text>
        <SubText>Small</SubText>
        <VSpacer size="sm" />
        <Text>Panels.</Text>
        <Panel>
          <Padding>
            <Heading size="xl">Title</Heading>
          </Padding>
        </Panel>
      </Stack>
    </Page>
  );
};
export default DesignRoot;
