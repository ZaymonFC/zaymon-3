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

const shadowVariants = {
  shadow: {
    sm: { boxShadow: "$1" },
    md: { boxShadow: "$2" },
    lg: { boxShadow: "$3" },
  },
};

export const Panel = styled("div", {
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
      I{"'"}m a software engineer currently based in Brisbane, Australia. My
      passion is building software that enhances human connection and
      relationships.
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
      I{"'"}m writing a series of short posts called <em>bytes</em> for{" "}
      <Link href="https://boundless.garden">Boundless.Garden</Link>.
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
  <Stack spacing="lg" direction="column">
    <ProjectEntry
      title="LetterDesk"
      from="2021"
      to="now"
      position={"Sole Developer"}
      link={["https://www.letterdesk.app", "https://roots.letterdesk.app"]}
      description="LetterDesk gives you the time and space to communicate your thoughts, feelings, stories and ideas with others without the pressure of instant messaging."
      technologies={[
        "Clojure",
        "Reitit",
        "PostgreSQL",
        "Malli ",
        "React",
        "TypeScript",
        "RxJs",
        "XState",
        "Zustand",
        "StitchesJS",
      ]}
    />
    <ProjectEntry
      title="The Boundless Garden"
      from="2021-08"
      to="now"
      position={"Developer / Writer"}
      link="https://www.boundless.garden"
      description="Boundless Garden is a place for me to let my guard down and tend to my thoughts. Currently, this consists of a series of essays documenting my personal journey."
      technologies={[
        "React",
        "Typescript",
        "NextJs",
        "StitchesJS",
        "ReactThreeFibre",
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

const Socials = () => {
  return (
    <Text>
      Follow me on{" "}
      <Link href="https://www.twitter.com/zaymonantonio">
        <a>Twitter</a>
      </Link>
      , see my code on{" "}
      <Link href="https://www.github.com/ZaymonFC">
        <a>GitHub</a>
      </Link>
      , check out what books I{"'"}m reading on{" "}
      <Link href="https://oku.club/user/zaymon">
        <a>Oku.Club</a>
      </Link>{" "}
      or have a look at my collections on{" "}
      <Link href="https://www.are.na/zaymon-antonio">
        <a>Are.Na</a>
      </Link>
      .
    </Text>
  );
};

const Acknowledgements = () => {
  return (
    <>
      <Text>
        This website is built with <Link href="https://nextjs.org">NextJS</Link>{" "}
        and{" "}
        <Link href="https://stitches.dev">
          <a>StitchesJS</a>
        </Link>
        .
      </Text>
      <VSpacer size="sm" />
      <Text>
        The{" "}
        <Link href="https://github.com/ZaymonFC/zaymon-3">
          <a>source code</a>
        </Link>{" "}
        is public on GitHub.
      </Text>
    </>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <>
    <Heading size="lg">{title}</Heading>
    <Separator />
    <VSpacer size="lg" />
  </>
);

const Favicons = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    {/* <meta name="msapplication-config" content="/browserconfig.xml" /> */}
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff"></meta>
    {/* <link rel="icon" href="/favicon.ico" />
     */}
  </>
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zaymon.dev</title>
        <meta name="description" content="Zaymon.dev" />
        <Favicons />
      </Head>
      <div>
        <BackgroundNoise />
        <Padding size="md">
          <Page>
            <Padding size={{ "@initial": "lg", "@bp1": "xl" }}>
              <Heading style={{ textAlign: "center" }} size="md">
                zaymon.dev
              </Heading>
            </Padding>

            <Letter />

            <VSpacer size={"xxl"} />

            <SectionHeader title={"Projects."} />
            <Projects />

            <VSpacer size={"xxl"} />

            <SectionHeader title="Socials." />
            <Socials />

            <VSpacer size={"xxl"} />

            <SectionHeader title={"Work."} />
            <WorkEntries />

            <VSpacer size="xxl" />
            <Acknowledgements />
          </Page>
        </Padding>
      </div>
    </>
  );
};

export default Home;
