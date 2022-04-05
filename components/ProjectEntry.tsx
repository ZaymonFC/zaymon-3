import { format, formatDuration, intervalToDuration } from "date-fns";
import { styled } from "../Stitches";
import Badge from "./Badge";
import { VSpacer } from "./Spacers";
import Stack from "./Stack";
import { Heading, Link, SubLink, SubText, Text } from "./Typography";

const Inlines = styled("div", {
  "> *": {
    display: "inline-block",
    marginRight: 4,
    marginBottom: 2,
  },
});

type ProjectEntryProps = {
  title: string;
  from: string;
  to: string | "now";
  description: string;
  link?: string;
  position?: string;
  technologies: string[];
};

const Time = ({ from, to }: any) => {
  const [fromDate, toDate] = [
    new Date(from),
    to === "now" ? new Date() : new Date(to),
  ];

  const duration = intervalToDuration({ start: fromDate, end: toDate });

  return (
    <>
      <SubText>
        {format(fromDate, "MMM yyyy")}
        {" to "}
        {to === "now" ? "Present" : format(toDate, "MMM yyyy")} (
        {formatDuration(duration, { format: ["years", "months"] })})
      </SubText>
    </>
  );
};

const ProjectEntry = ({
  title,
  from,
  to,
  description,
  link,
  position,
  technologies,
}: ProjectEntryProps) => (
  <div>
    <Stack spacing="sm" direction="column">
      <Stack
        justify={{ "@initial": "spaceBetween", "@bp1": undefined }}
        align={{ "@initial": "start", "@bp1": "end" }}
        direction={{ "@initial": "column", "@bp1": "row" }}
        spacing="none"
      >
        <Heading size="md">{title}</Heading>
        <Time {...{ from, to }}></Time>
      </Stack>

      <Stack
        spacing={{ "@initial": "sm", "@bp1": undefined }}
        direction={{ "@initial": "column", "@bp1": "row" }}
        justify={"spaceBetween"}
      >
        {position && <Text>{position}</Text>}
        {link && <SubLink href={link}>{link}</SubLink>}
      </Stack>

      <VSpacer size="xs" />
      <Text>{description}</Text>

      <Inlines>
        {technologies.map((technology, idx) => (
          <Badge key={idx}>{technology}</Badge>
        ))}
      </Inlines>
    </Stack>
  </div>
);

export default ProjectEntry;
