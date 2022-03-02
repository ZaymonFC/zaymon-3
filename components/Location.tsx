import LocationImage from "../images/location.png";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { styled } from "../Stitches";
import { Panel } from "../pages";
import Padding from "./Padding";
import Stack from "./Stack";
import { Heading } from "./Typography";

const locationAlt =
  "An image showing my position on a map centered on Brisbane Australia";

const ImageWithRadius = styled(Image, {
  borderRadius: "$3",
});

const LocationBox = styled("div", {
  maxWidth: 300,
});

export const Location = () => (
  <Panel>
    <Padding size="lg">
      <Stack justify="spaceBetween">
        <Heading size="lg">Where tf am i</Heading>
        <LocationBox>
          <ImageWithRadius src={LocationImage} alt={locationAlt} />
        </LocationBox>
      </Stack>
    </Padding>
  </Panel>
);
