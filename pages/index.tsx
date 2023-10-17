import type { NextPage } from "next";
import Head from "next/head";
import { styled } from "../Stitches";
import { BackgroundNoise } from "../components/BackgroundNoise";
import Padding from "../components/Padding";
import { Page } from "../components/Page";
import ProjectEntry from "../components/ProjectEntry";
import { Separator } from "../components/Separator";
import { VSpacer } from "../components/Spacers";
import Stack from "../components/Stack";
import { Heading, Link, Text } from "../components/Typography";

import dynamic from "next/dynamic";
import { SketchContainer } from "../components/SketchContainer";
import { Fade } from "../components/Fade";
import { ComponentType } from "react";
import MiniProjectEntry from "../components/MiniProjectEntry";

const randomSketches = ["circles"];

const randomSketch: any =
  randomSketches[Math.floor(Math.random() * randomSketches.length)];

const DynamicSketch: ComponentType<any> = dynamic(
  () => import("../components/Sketch").then((mod) => mod.SketchManager as any),
  { ssr: false, loading: () => <SketchContainer sketch={randomSketch} /> }
);

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
      I{"'"}m an Australian software engineer currently based in Vancouver,
      Canada. My passion is building software that enhances human connection and
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
      I{"'"}m writing for{" "}
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

const OngoingProjects = () => (
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
      description={`Boundless Garden is a place for me to explore my life and mind through writing.
          It's a bespoke blog written from scratch in NextJS, featuring a custom MDX renderer, design system, bibliography system—inspired by bibTeX, 3D graphics, and more.
        `}
      technologies={[
        "Typescript",
        "NextJs",
        "React",
        "react-three-fibre",
        "MDX",
        "StitchesJS",
      ]}
    />
  </Stack>
);

const Projects = () => (
  <Stack spacing="lg" direction="column">
    <MiniProjectEntry
      title="Iosevka"
      link={"https://github.com/ZaymonFC/iosevka/"}
      description="An iOS implementation of the word game Lexica."
      technologies={["Swift", "SwiftUI", "Combine", "ObservableStore", "Tries"]}
      date="2023"
    />
    <MiniProjectEntry
      title="Research for Lex.Page"
      description={`Explored solutions for comparing rich text documents in a unified way.
      Implemented a solution that given two versions of a prose-mirror document, generates a new diff-document, highlighting differences in text, formatting and markup.`}
      technologies={[
        "React",
        "TipTap",
        "ProseMirror",
        "Yjs",
        "json-diff-patch",

        "data structures and algorithms",
      ]}
      link={"https://lex.page/"}
      date="2023"
    />
    <MiniProjectEntry
      title="Connect-Four Advanced (3D)"
      link={"https://github.com/ZaymonFC/Connect4-3D-R3F"}
      description="A 3D implementation of Connect-Four Advanced (4x4x4) playable in the browser implemented in react-three-fiber."
      technologies={["react", "react-three-fiber", "jotai"]}
      date="2022"
    />
    <MiniProjectEntry
      title="mac-os-key-repeat"
      link={"https://github.com/ZaymonFC/mac-os-key-repeat"}
      description="A simple tool to test Mac OS key-repeat settings without restarting your computer more than once."
      technologies={["NextJS", "rxjs", "typescript", "StitchesJS"]}
      date="2022"
    />
    <MiniProjectEntry
      title="befunge-rust"
      link={"https://github.com/ZaymonFC/befunge-rust"}
      description="An implementation of a subset of the esolang 'Befunge'."
      technologies={["Rust", "Interpreters"]}
      date="2022"
    />
  </Stack>
);

const WorkEntries = () => (
  <Stack spacing="lg" direction="column">
    <ProjectEntry
      title="The Library of Economic Possibility"
      from="2023-03"
      to="2023-07"
      position="Freelance Software Engineer"
      description="Discover economic research for a better economy."
      technologies={["Svelte", "SvelteKit", "Typescript", "DatoCMS", "GraphQL"]}
      link="https://www.economicpossibility.org/"
    />
    <ProjectEntry
      title="UtilityOn"
      from="2022-10"
      to="2023-05"
      position="Senior Software Engineer"
      description="Quick and easy electricity connections for Texas home builders."
      technologies={[
        "Prisma",
        "NextJS",
        "Typescript",
        "PostgreSQL",
        "Jotai",
        "RxJs",
      ]}
      link="https://www.utilityon.com"
    />
    <ProjectEntry
      title="Connect Develop"
      from="2018-11-01"
      to="2022-02-25"
      position="Software Engineer"
      description="Creating beautiful, human-friendly digital experiences that solve problems for businesses and consumers at the intersection of the property and energy sectors."
      link="https://www.connectdevelop.com/"
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
      title="Locatrix"
      from="2017-01-04"
      to="2018-11-01"
      position={"Student Software Developer"}
      description={`Created a suite of UI tests to look out for regressions and ensure correctness.
                    Web API's and .NET web application code. Requirements analysis. Bug fixes and investigation.
                    Technology research and comparison.`}
      technologies={["C#", "TypeScript", "React", "Cypress E2E"]}
      link="https://www.locatrix.com"
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
          <a>Stitches</a>
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
        <meta
          name="description"
          content="Zaymon Antonio is an Australian software engineer based in Vancouver, Canada, passionate about building software that enhances human connection and relationships. Explore LetterDesk.app, his digital space for deep connection through letter writing. Discover his projects and expertise in React, TypeScript, and Next.js on his website. Stay updated on his work and interests."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Zaymon Antonio" />
        <meta
          name="keywords"
          content="software engineer, LetterDesk.app, human connection, relationships, React, TypeScript, Next.js, javascript"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Zaymon.dev" />
        <meta
          property="og:description"
          content="Zaymon Antonio is an Australian software engineer based in Vancouver, Canada, passionate about building software that enhances human connection and relationships. Explore LetterDesk.app, a digital space for deep connection through letter writing."
        />
        <meta property="og:url" content="https://zaymon.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Zaymon.dev" />
        <meta property="twitter:title" content="Zaymon.dev" />
        <meta
          property="twitter:description"
          content="Zaymon Antonio is an Australian software engineer based in Vancouver, Canada, passionate about building software that enhances human connection and relationships. Explore LetterDesk.app, a digital space for deep connection through letter writing."
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:creator" content="@zaymonantonio" />

        <Favicons />
      </Head>
      <div>
        <BackgroundNoise />
        <DynamicSketch sketch={randomSketch} />

        <Fade duration="medium">
          <Padding size="md">
            <Page>
              {/* <Padding size={{ "@initial": "lg", "@bp1": "xl" }}>
              <Heading style={{ textAlign: "center" }} size="md">
                zaymon.dev
              </Heading>
            </Padding> */}

              <Letter />
              <VSpacer size={"xxl"} />

              <SectionHeader title="Socials." />
              <Socials />

              <VSpacer size={"xxl"} />

              <SectionHeader title={"Ongoing Projects."} />
              <OngoingProjects />

              <VSpacer size={"xxl"} />

              <SectionHeader title={"Projects."} />
              <Projects />

              <VSpacer size={"xxl"} />

              <SectionHeader title={"Work."} />
              <WorkEntries />

              <VSpacer size="xxl" />
              <Acknowledgements />
            </Page>
          </Padding>
        </Fade>
      </div>
    </>
  );
};

export default Home;
