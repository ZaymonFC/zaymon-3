import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
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
import { ComponentType, useState, useEffect } from "react";
import MiniProjectEntry from "../components/MiniProjectEntry";
import { ShaderBackground } from "../components/ShaderBackground";
import { GlassCard } from "../components/GlassCard";
import { useAtom } from "jotai";
import { currentPaletteAtom, type PaletteName } from "../lib/paletteState";
import { LegendButton } from "../components/LegendButton";

const randomSketches = ["circles"];

const randomSketch: any =
  randomSketches[Math.floor(Math.random() * randomSketches.length)];

const DynamicSketch: ComponentType<any> = dynamic(
  () => import("../components/Sketch").then((mod) => mod.SketchManager as any),
  { ssr: false, loading: () => <SketchContainer sketch={randomSketch} /> },
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
        borderColor: "$type",
        borderWidth: 2,
        borderStyle: "solid",
      },
    },
  },
});


const UIContainer = styled("div", {
  transition: "opacity 0.3s ease-out",
  variants: {
    visible: {
      true: {
        opacity: 1,
        pointerEvents: "auto",
      },
      false: {
        opacity: 0,
        pointerEvents: "none",
      },
    },
  },
});

const Letter = () => (
  <Stack direction={"column"}>
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
      If you{"'"}re building software that aims to make the world better, expand
      how people think, or offers a new perspective on the human experience and
      you would like to talk to me, please{" "}
      <Link href="mailto:zaymon.antonio@protonmail.com">get in touch</Link>.
    </Text>
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
      title="Connect-4 Advanced 3D"
      link={"https://github.com/ZaymonFC/Connect4-3D-R3F"}
      description="A 3D implementation of Connect-Four Advanced (4x4x4) playable in the browser implemented in react-three-fiber."
      technologies={["react", "react-three-fiber", "jotai"]}
      date="2022"
    />
    <MiniProjectEntry
      title="mac-os-key-repeat"
      link={"https://github.com/ZaymonFC/mac-os-key-repeat"}
      description="A simple tool to test Mac OS key-repeat settings without restarting your computer more than once."
      technologies={["NextJS", "rxjs", "StitchesJS"]}
      date="2022"
    />
    <MiniProjectEntry
      title="befunge-rust"
      link={"https://github.com/ZaymonFC/befunge-rust"}
      description="An interpreter for a significant subset of the esolang 'Befunge'."
      technologies={["Rust", "Interpreters"]}
      date="2022"
    />
  </Stack>
);

const WorkEntries = () => (
  <Stack spacing="lg" direction="column">
    <ProjectEntry
      title="DXOS"
      from="2024-03"
      to="2025-07"
      position="Software Engineer"
      description="Building a decentralized, real-time collaborative platform with peer-to-peer sync, offline-first capabilities, and extensible plugin architecture."
      technologies={["TypeScript", "React", "AutoMerge", "Lit"]}
      link="https://dxos.org/"
    />
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
      title="Lex.Page"
      from="2023"
      to="2023"
      position="Research & Development"
      description="Explored solutions for building unified diffs for rich text. Implemented a solution that given two versions of a prose-mirror document, generates a new diff-document, highlighting differences in text, formatting and markup."
      technologies={[
        "React",
        "TipTap",
        "ProseMirror",
        "Yjs",
        "json-diff-patch",
        "data structures and algorithms",
      ]}
      link="https://lex.page/"
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
      <Link href="https://bsky.app/profile/boundless.garden">Bluesky</Link> and{" "}
      <Link href="https://www.twitter.com/zaymonantonio">X</Link>, see my code
      on <Link href="https://www.github.com/ZaymonFC">GitHub</Link>, check out
      what books I{"'"}m reading on{" "}
      <Link href="https://oku.club/user/zaymon">Oku.Club</Link> or have a look
      at my collections on{" "}
      <Link href="https://www.are.na/zaymon-antonio">Are.Na</Link>.
    </Text>
  );
};

const Acknowledgements = () => {
  return (
    <>
      <Text>
        This website is built with <Link href="https://nextjs.org">NextJS</Link>
        , <Link href="https://stitches.dev">Stitches</Link>,{" "}
        <Link href="https://github.com/ch-ui-dev/ch-ui">@ch-ui</Link> and{" "}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API">
          WebGL
        </Link>
        .
      </Text>
      <VSpacer size="sm" />
      <Text>
        The <Link href="https://github.com/ZaymonFC/zaymon-3">source code</Link>{" "}
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
  const [currentPalette, setCurrentPalette] = useAtom(currentPaletteAtom);
  const [isVibingOut, setIsVibingOut] = useState(false);

  // TODO: Derive this from the available palettes
  const palettes: PaletteName[] = ["blue", "gold", "red"];

  const cycleTheme = () => {
    const currentIndex = palettes.indexOf(currentPalette);
    const nextIndex = (currentIndex + 1) % palettes.length;
    setCurrentPalette(palettes[nextIndex]);
  };

  const vibeOut = () => {
    setIsVibingOut(true);
  };

  const stopVibing = () => {
    setIsVibingOut(false);
  };

  useEffect(() => {
    if (isVibingOut) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVibingOut]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVibingOut) {
        stopVibing();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isVibingOut]);

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
        <ShaderBackground />
        <BackgroundNoise />

        {isVibingOut && (
          <LegendButton onClick={stopVibing} fixed position="bottomLeft">
            Quit vibing (esc)
          </LegendButton>
        )}

        <main>
          <UIContainer visible={!isVibingOut}>
            <Fade duration="medium">
              <Padding
                size="md"
                css={{
                  paddingTop: "$2",
                  "@bp1": {
                    paddingTop: "$4",
                  },
                }}
              >
                <Page>
                  {/* <Padding size={{ "@initial": "lg", "@bp1": "xl" }}>
              <Heading style={{ textAlign: "center" }} size="md">
                zaymon.dev
              </Heading>
            </Padding> */}

                  <GlassCard title="Dear Visitor">
                    <Letter />
                  </GlassCard>

                  <GlassCard title="Socials">
                    <Socials />
                  </GlassCard>

                  <GlassCard title="Ongoing Projects">
                    <OngoingProjects />
                  </GlassCard>

                  <GlassCard title="Projects">
                    <Projects />
                  </GlassCard>

                  <GlassCard title="Work">
                    <WorkEntries />
                  </GlassCard>

                  <GlassCard title="source">
                    <Acknowledgements />
                  </GlassCard>

                  <VSpacer size="lg" />

                  <Stack
                    direction="row"
                    spacing="md"
                    css={{ flexWrap: "wrap" }}
                  >
                    <LegendButton onClick={cycleTheme}>
                      cycle theme
                    </LegendButton>
                    <LegendButton href="/colors">
                      color playground
                    </LegendButton>
                    <LegendButton onClick={vibeOut}>vibe out</LegendButton>
                  </Stack>
                </Page>
              </Padding>
            </Fade>
          </UIContainer>
        </main>
      </div>
    </>
  );
};

export default Home;
