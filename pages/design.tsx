import React from "react";
import { BackgroundNoise } from "../components/BackgroundNoise";
import Badge from "../components/Badge";
import Padding from "../components/Padding";
import { Page } from "../components/Page";
import ProjectEntry from "../components/ProjectEntry";
import { Separator } from "../components/Separator";
import { VSpacer } from "../components/Spacers";
import Stack from "../components/Stack";
import { Heading, Link, SubText, Text } from "../components/Typography";
import { Panel } from "./index";

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
    <Stack spacing="md">
      <Link href="#">Link</Link>
      <Link href="#" invert>
        Inverted Link
      </Link>
    </Stack>
  </div>
);

const Components = () => (
  <>
    <Text>Badges.</Text>
    <Separator />
    <VSpacer size="sm" />

    <Stack spacing="sm" align="center">
      <Badge>Badge</Badge>
      <Badge>Badge</Badge>
      <Badge>Badge</Badge>
    </Stack>
  </>
);

const SectionHeader = ({ title }: { title: string }) => (
  <>
    <Text>{title}</Text>
    <Separator />
  </>
);

const LetterDeskEntry = () => (
  <ProjectEntry
    title="LetterDesk"
    from="2021"
    to="now"
    link="https://www.letterdesk.app"
    description="LetterDesk gives you the time and space to communicate your thoughts, feelings, stories and ideas with others without the pressure of instant messaging."
    technologies={[
      "Clojure",
      "Reitit",
      "HugSQL",
      "Mount",
      "Malli ",
      "React",
      "TypeScript",
      "RxJs",
      "XState",
      "Zustand",
      "StitchesJS",
    ]}
  />
);

const DesignRoot = () => {
  return (
    <Page>
      <VSpacer size="lg" />
      <Stack direction="column">
        <SectionHeader title="Typography." />
        <Typography />
        <VSpacer size="xs" />
        <SectionHeader title="Panels." />
        <VSpacer size="xs" />
        <Panel emphasis="strong" shadow="md">
          <Padding>
            <Heading size="xl">Title</Heading>
          </Padding>
        </Panel>
        <VSpacer size="xs" />

        <Components />

        <VSpacer size="xs" />
        <SectionHeader title="Project entry." />

        <LetterDeskEntry />

        <VSpacer size="sm" />
      </Stack>
      <BackgroundNoise />
    </Page>
  );
};
export default DesignRoot;
