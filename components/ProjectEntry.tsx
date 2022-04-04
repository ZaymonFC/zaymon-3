import { format, intervalToDuration } from "date-fns";
import { styled } from "../Stitches";
import Badge from "./Badge";
import { VSpacer } from "./Spacers";
import Stack from "./Stack";
import { Heading, Link, SubText, Text } from "./Typography";

const Left = styled("div", {
  width: 100,
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
  position?: string;
  technologies: string[];
};

const ProjectEntry = ({
  title,
  from,
  to,
  description,
  link,
  position,
  technologies,
}: ProjectEntryProps) => {
  const [fromDate, toDate] = [
    new Date(from),
    to === "now" ? new Date() : new Date(to),
  ];

  // const duration = intervalToDuration({ start: fromDate, end: toDate });

  return (
    <Stack spacing="lg">
      <Left>
        <SubText>
          {format(fromDate, "MMM yyyy")}
          {" to "}
          {to === "now" ? "Present" : format(toDate, "MMM yyyy")}
        </SubText>
        <VSpacer size="md" />
        {/* <SubText>
            {formatDuration(duration, { format: ["years", "months"] })}
          </SubText> */}
      </Left>
      <Right>
        <Stack direction="column" spacing="none">
          <Stack justify={"spaceBetween"} align="end">
            <Heading size="md">{title}</Heading>
            <Stack spacing="sm">
              {position && <Text>{position}</Text>}

              {link && (
                <>
                  <Text>-</Text>
                  <Link href={link}>{link}</Link>
                </>
              )}
            </Stack>
          </Stack>
          <VSpacer size="sm"></VSpacer>
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
