import { useState, useEffect } from "react";
import { generatePalette, type PaletteShade } from "../lib/colors";
import {
  detectBestColorSpace,
  getColorSpaceSupport,
} from "../lib/colorSpaceDetection";
import type { Gamut } from "@ch-ui/colors";
import { LegendButton } from "../components/LegendButton";
import { Fade } from "../components/Fade";
import { styled } from "../Stitches";
import { Heading, Text, SubText } from "../components/Typography";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

const Container = styled("div", {
  paddingInline: "$5",
  fontFamily: "$mono",
  position: "relative",
  "@bp1": {
    paddingTop: "$7",
    paddingBlock: "$7",
  },
});

const PageHeading = styled(Heading, {
  marginTop: "$2",
});

const Subheading = styled(SubText, {
  marginBottom: "$6",
  opacity: 0.6,
});

const Panel = styled("div", {
  padding: "$5",
  border: "1px solid",
});

const ControlPanel = styled(Panel, {
  marginBottom: "$6",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
  gap: "$6",
});

const ControlGroup = styled("div", {});

const Label = styled("label", {
  display: "block",
  marginBottom: "$4",
  fontSize: "$2",
});

const HelperText = styled("div", {
  fontSize: "$1",
  marginTop: "$3",
  opacity: 0.7,
});

const RangeInput = styled("input", {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
});

const Select = styled("select", {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  padding: "$4",
  fontSize: "$2",
  border: "$borderWidths$1 solid #555",
  borderRadius: "$3",
});

const Button = styled("button", {
  padding: "$4",
  fontSize: "$2",
  fontFamily: "$mono",
  fontWeight: "bold",
  border: "1px solid",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    opacity: 0.8,
  },
  "&:active": {
    transform: "scale(0.98)",
  },
});

const SectionHeading = styled(Heading, {
  marginTop: "$6",
  marginBottom: "$2",
});

const PaletteGrid = styled("div", {
  display: "flex",
  gap: "$3",
  flexWrap: "wrap",
});

// TODO: Swatches shouldn't be defined explicitly in terms of dimensions but should use an adaptive grid. Max cell size 60px.
const PaletteSwatch = styled("div", {
  width: "5em",
  height: "120px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "$4",
  fontSize: "$1",
  fontWeight: "bold",
});

// Details should use css-grid constructs instead of flex-box. Current layout is broken on mobile.
const DetailRow = styled("div", {
  display: "flex",
  gap: "$6",
  marginBottom: "$4",
  alignItems: "center",
});

const ShadeLabel = styled("div", {
  width: "60px",
  fontWeight: "bold",
});

const ColorSwatch = styled("div", {
  width: "40px",
  height: "20px",
});

const ColorValue = styled("div", {
  flex: 1,
  fontSize: "$2",
  fontFamily: "$mono",
});

const LuminosityLabel = styled(SubText, {
  fontSize: "$1",
  opacity: 0.6,
});

const InfoPanel = styled(Panel, {
  fontFamily: "$mono",
});

const InfoGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: "$5",
});

const StatusLabel = styled("div", {
  fontSize: "$3",
  textTransform: "uppercase",
});

const StatusValue = styled("div", {
  fontSize: "$2",
});

export default function Colors() {
  // TODO: Merge all of these into an object and store that inside an atom from jotai. (useAtom).
  // Update read and updates to use the atom API.

  // Interactive state for palette configuration
  const [lightness, setLightness] = useState(0.43);
  const [chroma, setChroma] = useState(0.4);
  const [hue, setHue] = useState(276);
  const [lowerCp, setLowerCp] = useState(1);
  const [upperCp, setUpperCp] = useState(1);
  const [torsion, setTorsion] = useState(-12);
  const [gamut, setGamut] = useState<Gamut>("p3");

  // TODO: Refactor this hook into useDetectColorSpaceInfo.ts
  // Color space detection
  const [colorSpaceInfo, setColorSpaceInfo] = useState<ReturnType<
    typeof getColorSpaceSupport
  > | null>(null);

  useEffect(() => {
    // Detect on client side only.
    const info = getColorSpaceSupport();
    setColorSpaceInfo(info);
    // Auto-select the best supported gamut.
    setGamut(detectBestColorSpace());
  }, []);

  const { copy, buttonText } = useCopyToClipboard({
    copyText: "Copy Palette Config",
    copiedText: "Copied!",
    getText: () =>
      JSON.stringify(
        {
          lightness,
          chroma,
          hue,
          lowerCp,
          upperCp,
          torsion,
          gamut,
        },
        null,
        2,
      ),
  });

  // Generate the palette using our utility
  const generatedPalette = generatePalette({
    lightness,
    chroma,
    hue,
    lowerCp,
    upperCp,
    torsion,
    gamut,
  });

  // TODO: Use the shade number constants from our palette utilities.
  // Convert to display format
  const shadeNumbers: PaletteShade[] = [
    50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
    800, 850, 900, 950,
  ];

  const palette = shadeNumbers.map((shade) => ({
    shade,
    luminosity: (1000 - shade) / 1000,
    color: generatedPalette[shade],
  }));

  // Get colors from the palette
  const accentColor = generatedPalette[300];
  const lightTextColor = generatedPalette[50];
  const darkPanelColor = generatedPalette[900];
  const buttonColor = generatedPalette[850];
  const borderColor = generatedPalette[800];

  return (
    <Fade duration="short">
      <Container style={{ color: lightTextColor }}>
        <LegendButton href="/" fixed position="topLeft">
          Home
        </LegendButton>
        <PageHeading as="h1" size="xl" style={{ color: lightTextColor }}>
          Palette Test - Interactive
        </PageHeading>
        <Subheading style={{ color: lightTextColor }}>
          Using @ch-ui/colors for perceptually uniform color generation
        </Subheading>

        {/* Interactive Controls */}
        <ControlPanel style={{ background: darkPanelColor, borderColor }}>
          <ControlGroup>
            <Label>
              Hue: <strong>{hue}°</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="360"
              step="1"
              value={hue}
              onChange={(e) => setHue(parseInt(e.target.value))}
            />
            <HelperText style={{ color: lightTextColor }}>
              Color angle (0=red, 120=green, 240=blue)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Lightness: <strong>{lightness.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={lightness}
              onChange={(e) => setLightness(parseFloat(e.target.value))}
            />
            <HelperText style={{ color: lightTextColor }}>
              Key color lightness (0 = black, 1 = white)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Chroma: <strong>{chroma.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={chroma}
              onChange={(e) => setChroma(parseFloat(e.target.value))}
            />
            <HelperText style={{ color: lightTextColor }}>
              Colorfulness/saturation intensity
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Lower CP: <strong>{lowerCp.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={lowerCp}
              onChange={(e) => setLowerCp(parseFloat(e.target.value))}
            />
            <HelperText style={{ color: lightTextColor }}>
              Dark curve control (1 = straight)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Upper CP: <strong>{upperCp.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={upperCp}
              onChange={(e) => setUpperCp(parseFloat(e.target.value))}
            />
            <HelperText style={{ color: lightTextColor }}>
              Light curve control (1 = straight)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Torsion: <strong>{torsion}</strong>
            </Label>
            <RangeInput
              type="range"
              min="-50"
              max="50"
              step="1"
              value={torsion}
              onChange={(e) => setTorsion(parseInt(e.target.value))}
            />
            <HelperText style={{ color: lightTextColor }}>
              Hue rotation to prevent color shifts
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Gamut: <strong>{gamut}</strong>
            </Label>
            <Select
              value={gamut}
              onChange={(e) => setGamut(e.target.value as Gamut)}
              style={{ color: lightTextColor, backgroundColor: darkPanelColor }}
            >
              <option value="rec2020">Rec. 2020 (ultra-wide gamut)</option>
              <option value="p3">Display P3 (wide gamut)</option>
              <option value="srgb">sRGB (standard)</option>
            </Select>
            <HelperText style={{ color: lightTextColor }}>
              Color space for output values
            </HelperText>
          </ControlGroup>

          <div style={{ gridColumn: "1 / -1" }}>
            <Button
              onClick={copy}
              style={{
                color: accentColor,
                backgroundColor: buttonColor,
                borderColor: accentColor,
                width: "100%",
              }}
            >
              {buttonText}
            </Button>
          </div>
        </ControlPanel>

        {/* Palette Visualization */}
        <SectionHeading as="h2" size="lg" style={{ color: lightTextColor }}>
          Palette
        </SectionHeading>
        <PaletteGrid>
          {palette.map(({ shade, color }) => (
            <PaletteSwatch
              key={shade}
              style={{
                backgroundColor: color,
                color: shade < 500 ? "#000" : "#fff",
              }}
            >
              {shade}
            </PaletteSwatch>
          ))}
        </PaletteGrid>

        <div>
          <SectionHeading as="h2" size="lg" style={{ color: lightTextColor }}>
            Palette Details
          </SectionHeading>
          <Text css={{ marginBottom: "$5" }} style={{ color: lightTextColor }}>
            <strong>Gamut:</strong> {gamut} | <strong>Shades:</strong>{" "}
            {palette.length}
          </Text>
          {palette.map(({ shade, luminosity, color }) => (
            <DetailRow key={shade}>
              <ShadeLabel>{shade}</ShadeLabel>
              <ColorSwatch style={{ backgroundColor: color }} />
              <ColorValue>{color}</ColorValue>
              <LuminosityLabel style={{ color: lightTextColor }}>
                L={luminosity.toFixed(2)}
              </LuminosityLabel>
            </DetailRow>
          ))}
        </div>

        {/* Color Space Support Info */}
        {colorSpaceInfo && (
          <div>
            <SectionHeading as="h2" size="lg" style={{ color: lightTextColor }}>
              Color Space Support
            </SectionHeading>
            <InfoPanel style={{ background: darkPanelColor, borderColor }}>
              <InfoGrid>
                <div>
                  <StatusLabel style={{ color: accentColor }}>
                    sRGB{colorSpaceInfo.best === "srgb" && " (detected)"}
                  </StatusLabel>
                  <StatusValue
                    style={{
                      color: colorSpaceInfo.srgb ? "#4CAF50" : "#f44336",
                    }}
                  >
                    {colorSpaceInfo.srgb ? "✓ Supported" : "✗ Not supported"}
                  </StatusValue>
                  <SubText
                    css={{ marginTop: "$3", fontSize: "$1" }}
                    style={{ color: lightTextColor, opacity: 0.7 }}
                  >
                    Standard gamut (all displays)
                  </SubText>
                </div>
                <div>
                  <StatusLabel style={{ color: accentColor }}>
                    Display P3{colorSpaceInfo.best === "p3" && " (detected)"}
                  </StatusLabel>
                  <StatusValue
                    style={{
                      color: colorSpaceInfo.p3 ? "#4CAF50" : "#f44336",
                    }}
                  >
                    {colorSpaceInfo.p3 ? "✓ Supported" : "✗ Not supported"}
                  </StatusValue>
                  <SubText
                    css={{ marginTop: "$3", fontSize: "$1" }}
                    style={{ color: lightTextColor, opacity: 0.7 }}
                  >
                    ~25% wider than sRGB (modern displays)
                  </SubText>
                </div>
                <div>
                  <StatusLabel style={{ color: accentColor }}>
                    Rec. 2020
                    {colorSpaceInfo.best === "rec2020" && " (detected)"}
                  </StatusLabel>
                  <StatusValue
                    style={{
                      color: colorSpaceInfo.rec2020 ? "#4CAF50" : "#f44336",
                    }}
                  >
                    {colorSpaceInfo.rec2020 ? "✓ Supported" : "✗ Not supported"}
                  </StatusValue>
                  <SubText
                    css={{ marginTop: "$3", fontSize: "$1" }}
                    style={{ color: lightTextColor, opacity: 0.7 }}
                  >
                    Ultra-wide gamut (HDR displays)
                  </SubText>
                </div>
              </InfoGrid>
            </InfoPanel>
          </div>
        )}
      </Container>
    </Fade>
  );
}
