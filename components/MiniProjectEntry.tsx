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

const DateText = styled(Text, {
  color: "$type",
});

type ProjectEntryProps = {
  title: string;
  date: string;
  description: string;
  link?: string | string[];
  technologies: string[];
};

const MiniProjectEntry = ({
  title,
  date,
  description,
  link,
  technologies,
}: ProjectEntryProps) => (
  <div>
    <Stack spacing="none" direction="column">
      <Stack
        justify={{ "@initial": "spaceBetween", "@bp1": undefined }}
        align={{ "@initial": "center", "@bp1": "end" }}
        direction={"row"}
        spacing="none"
      >
        <Heading size="md">{title}</Heading>
        <DateText>{date}</DateText>
      </Stack>

      <Stack
        spacing={{ "@initial": "sm", "@bp1": "none" }}
        direction={{ "@initial": "column", "@bp1": "row" }}
        justify={"spaceBetween"}
      >
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

export default MiniProjectEntry;
