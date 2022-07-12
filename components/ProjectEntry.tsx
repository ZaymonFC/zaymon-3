import { format, formatDuration, intervalToDuration } from "date-fns";
import { styled } from "../Stitches";
import Badge from "./Badge";
import { VSpacer } from "./Spacers";
import Stack from "./Stack";
import { Heading, SubLink, SubText, Text } from "./Typography";

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
  link?: string | string[];
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

const Role = styled(Text, {
  color: "$orange",
});

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
    <Stack spacing="none" direction="column">
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
        spacing={{ "@initial": "sm", "@bp1": "none" }}
        direction={{ "@initial": "column", "@bp1": "row" }}
        justify={"spaceBetween"}
      >
        {position && <Role>{position}</Role>}

        <Stack spacing="sm" direction={{ "@initial": "column", "@bp1": "row" }}>
          {link &&
            (Array.isArray(link) ? (
              link.map((link) => (
                <SubLink key={link} href={link}>
                  {link}
                </SubLink>
              ))
            ) : (
              <SubLink href={link}>{link}</SubLink>
            ))}
        </Stack>
      </Stack>

      <VSpacer size="sm" />
      <Text>{description}</Text>
      <VSpacer size="xs" />

      <Inlines>
        {technologies.map((technology, idx) => (
          <Badge key={idx}>{technology}</Badge>
        ))}
      </Inlines>
    </Stack>
  </div>
);

export default ProjectEntry;
