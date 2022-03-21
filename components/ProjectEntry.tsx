import { format, formatDuration, intervalToDuration } from "date-fns";
import { styled } from "../Stitches";
import Badge from "./Badge";
import Padding from "./Padding";
import { VSpacer } from "./Spacers";
import Stack from "./Stack";
import { Heading, Link, Text, SubText } from "./Typography";

const Left = styled("div", {
  width: 150,
  paddingTop: 10, // HACK. Workout how to make this nicer.
});

const Right = styled("div", {
  width: "100%",
});

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
  technologies: string[];
};

const ProjectEntry = ({
  title,
  from,
  to,
  description,
  link,
  technologies,
}: ProjectEntryProps) => {
  const [fromDate, toDate] = [
    new Date(from),
    to === "now" ? new Date() : new Date(to),
  ];

  const duration = intervalToDuration({ start: fromDate, end: toDate });

  return (
    <Stack spacing="lg">
      <Left>
        <Stack direction="column" align="end" spacing="none">
          <SubText>
            {format(fromDate, "yyyy")} -{" "}
            {to === "now" ? "Now" : format(toDate, "yyyy")}
          </SubText>
          <VSpacer size="sm" />
          <SubText>
            {formatDuration(duration, { format: ["years", "months"] })}
          </SubText>
        </Stack>
      </Left>
      <Right>
        <Stack direction="column" spacing="sm">
          <Stack justify="spaceBetween" align="end">
            <Heading size="md">{title}</Heading>
            {link && <Link href={link}>{link}</Link>}
          </Stack>
          <Text>{description}</Text>
          <Inlines>
            {technologies.map((technology, idx) => (
              <Badge key={idx}>{technology}</Badge>
            ))}
          </Inlines>
        </Stack>
      </Right>
    </Stack>
  );
};

export default ProjectEntry;
