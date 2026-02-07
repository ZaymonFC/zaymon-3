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
import { Card } from "../components/Card";
import { CardDouble } from "../components/CardDouble";
import { Button } from "../components/Button";
import { ActionBar } from "../components/ActionBar";

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

const SRCLComponents = () => (
  <>
    <Text>SRCL Cards (Terminal Aesthetic).</Text>
    <Separator />
    <VSpacer size="md" />

    <Stack spacing="lg" direction="column">
      <Card title="Default Card">
        <Text>
          This is a Sacred Computer inspired card component with box-shadow
          borders and terminal aesthetics.
        </Text>
      </Card>

      <Card title="Left Corner Card" mode="left">
        <Text>
          Cards can have decorative corners on the left side for visual variety.
        </Text>
      </Card>

      <Card title="Right Corner Card" mode="right">
        <Text>
          Or corners on the right side. These mimic classic MS-DOS UI patterns.
        </Text>
      </Card>

      <CardDouble title="Double Border Card">
        <Text>
          This variant uses CSS double borders instead of box-shadows for a more
          pronounced retro aesthetic.
        </Text>
      </CardDouble>
    </Stack>

    <VSpacer size="lg" />
    <Text>SRCL Buttons.</Text>
    <Separator />
    <VSpacer size="md" />

    <Stack spacing="md" direction="column">
      <Button theme="PRIMARY">Primary Button</Button>
      <Button theme="SECONDARY">Secondary Button</Button>
      <Button theme="PRIMARY" isDisabled>
        Disabled Button
      </Button>
    </Stack>

    <VSpacer size="lg" />
    <Text>Action Bar.</Text>
    <Separator />
    <VSpacer size="md" />

    <ActionBar
      items={[
        { body: "File", onClick: () => console.log("File") },
        { body: "Edit", onClick: () => console.log("Edit") },
        { body: "View", onClick: () => console.log("View"), selected: true },
        { body: "Help", onClick: () => console.log("Help") },
      ]}
    />
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

        <VSpacer size="lg" />
        <SectionHeader title="SRCL Components." />
        <SRCLComponents />

        <VSpacer size="lg" />
        <SectionHeader title="Project entry." />

        <LetterDeskEntry />

        <VSpacer size="sm" />
      </Stack>
      <BackgroundNoise />
    </Page>
  );
};
export default DesignRoot;
