import type { NextPage } from "next";
import Head from "next/head";
import { BackgroundNoise } from "../components/BackgroundNoise";
import Padding from "../components/Padding";
import { Page } from "../components/Page";
import ProjectEntry from "../components/ProjectEntry";
import { Separator } from "../components/Separator";
import { VSpacer } from "../components/Spacers";
import Stack from "../components/Stack";
import { Heading, Link, Text } from "../components/Typography";
import { styled } from "../Stitches";

const Body = styled("body", {
  fontSize: 12,
  fontWeight: 600,
});

const shadowVariants = {
  shadow: {
    sm: { boxShadow: "$1" },
    md: { boxShadow: "$2" },
    lg: { boxShadow: "$3" },
  },
};

export const Panel = styled("div", {
  // background: "rgba(255, 255, 255, 0.1)",

  borderRadius: "$4",
  marginLeft: "auto",
  marginRight: "auto",

  padding: "$4",

  variants: {
    ...shadowVariants,
    emphasis: {
      light: {
        borderColor: "white",
        borderWidth: 1,
        borderStyle: "solid",
      },
      strong: {
        borderColor: "$orange",
        borderWidth: 2,
        borderStyle: "solid",
      },
    },
  },
});

const Letter = () => (
  <Stack direction={"column"}>
    <Heading>Dear Visitor,</Heading>
    <Text>
      I{"'"}m a full-stack software engineer currently based in Brisbane,
      Australia. My passion is building software that enhances human connection
      and relationships.
    </Text>
    <Text>
      The way software can create space for the user is fascinating. Software
      can empower people to think in new ways, facilitate self-discovery and
      explore the relationship between us and the world. I believe that software
      should aim to <em>expand</em> human awareness over profit maxing.
    </Text>
    <Text>
      I currently spend my time building{" "}
      <Link href="https://www.letterdesk.app">LetterDesk.app</Link>, a digital
      space that allows people to explore human experience together through
      letter writing and deep connection.
    </Text>
    <Text>
      I{"'"}m also working on a series of short posts called <em>bytes</em>{" "}
      <Link>here</Link> for <strong>Boundless.Garden</strong>
    </Text>
    <Text>
      If you{"'"}re building software that aims to make the world better, expand
      how people think, or offers a new perspective on the human experience and
      you would like to talk to me, please{" "}
      <Link href="mailto:zaymon.antonio@protonmail.com">get in touch</Link>.
    </Text>
    <VSpacer size="md" />
    <Text>Regards,</Text>
    <Text> Zaymon Antonio</Text>
  </Stack>
);

const Projects = () => (
  <Stack direction="column">
    <ProjectEntry
      title="LetterDesk"
      from="2021"
      to="now"
      position={"Sole Developer"}
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
  </Stack>
);

const WorkEntries = () => (
  <Stack spacing="lg" direction="column">
    <ProjectEntry
      title="Connect Develop"
      from="2018-11-01"
      to="2022-02-25"
      position="Software Engineer"
      description="Creating beautiful, human-friendly digital experiences that solve problems for businesses and consumers at the intersection of the property and energy sectors."
      technologies={[
        "F#",
        ".NET Core",
        "ASP.NET Core",
        "EventStore",
        "TypeScript",
        "React",
      ]}
    />
    <ProjectEntry
      title="Concept Safety Systems"
      from="2017-01-04"
      to="2018-11-01"
      position={"Student Software Developer"}
      description={`Created a suite of UI tests to look out for regressions and ensure correctness.
                    Web API's and .NET web application code. Requirements analysis. Bug fixes and investigation.
                    Technology research and comparison.`}
      technologies={["C#", "TypeScript", "React", "Cypress E2E"]}
    />
    <ProjectEntry
      title="Griffith University"
      from="2017-03-01"
      to="2018-07-01"
      position="PASS Leader"
      description={`Working as a PASS Leader (peer assisted study sessions) with classes up to 25 students for the courses
                    Computer Systems and Networks and Data Management.
                    Maintained high student retention rates throughout the semester.`}
      technologies={[
        "Logisim",
        "SQL",
        "Computing Fundamentals",
        "Error Detection",
        "OSI Stack",
        "Binary Representations",
        "Gate Logic",
      ]}
    />
  </Stack>
);

const SectionHeader = ({ title }: { title: string }) => (
  <>
    <Heading size="lg">{title}</Heading>
    <VSpacer size="xs" />
    <Separator />
  </>
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zaymon.dev</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <BackgroundNoise />
        <Padding size="md">
          <Page>
            <VSpacer size={"md"} />
            <Heading style={{ textAlign: "center" }} size="md">
              zaymon.dev
            </Heading>
            <VSpacer size={"xl"} />

            <Letter />

            <VSpacer size={"xl"} />
            <VSpacer size={"xl"} />

            <SectionHeader title={"Projects."} />
            <VSpacer size={"xl"} />
            <Projects />

            <VSpacer size={"xl"} />
            <VSpacer size={"xl"} />

            <SectionHeader title={"Work."} />
            <VSpacer size="xl" />
            <WorkEntries />

            {/* <Stack spacing="lg" direction="column">
            <Panel shadow="lg">
              <Padding size="lg">
                <Heading size="lg">This is me.</Heading>
                <Text>
                  Hey there. I{"'"}m a software engineer. I write programs. Do
                  you need help with a program? Why? Write your own damn
                  program. Jk this is filler text love you.
                </Text>
              </Padding>
            </Panel> */}

            {/* <Location /> */}

            {/* <Books /> */}
            {/* </Stack> */}
          </Page>
        </Padding>
      </Body>
    </>
  );
};

export default Home;
