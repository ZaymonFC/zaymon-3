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

const Container = styled("div", {
  padding: "$7",
  fontFamily: "Iosevka SS05, Söhne Mono, menlo, monospace",
  position: "relative",
});

const PageHeading = styled(Heading, {
  marginTop: "$7",
});

const Subheading = styled(SubText, {
  marginBottom: "$6",
  opacity: 0.6,
});

const ControlPanel = styled("div", {
  padding: "$6",
  borderRadius: "$4",
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
  opacity: 0.4,
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
  backgroundColor: "#333",
  border: "$borderWidths$1 solid #555",
  borderRadius: "$3",
});

const SectionHeading = styled(Heading, {
  marginTop: "$6",
  marginBottom: "$5",
});

const PaletteGrid = styled("div", {
  display: "flex",
  gap: "$3",
  flexWrap: "wrap",
});

const PaletteSwatch = styled("div", {
  width: "60px",
  height: "120px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "$4",
  fontSize: "$1",
  fontWeight: "bold",
});

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
  border: "$borderWidths$1 solid #ccc",
});

const ColorValue = styled("div", {
  flex: 1,
  fontSize: "$2",
  fontFamily: "Iosevka SS05, Söhne Mono, menlo, monospace",
});

const LuminosityLabel = styled(SubText, {
  fontSize: "$1",
  opacity: 0.6,
});

const CodeBlock = styled("pre", {
  padding: "$5",
  borderRadius: "$3",
  fontSize: "$1",
  overflow: "auto",
});

const InfoPanel = styled("div", {
  padding: "$6",
  borderRadius: "$4",
  border: "$borderWidths$1 solid #333",
});

const InfoGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: "$5",
});

const StatusLabel = styled("div", {
  fontSize: "$1",
});

const StatusValue = styled("div", {
  fontSize: "20px",
});

const InfoText = styled("div", {
  fontSize: "$1",
  lineHeight: "1.6",
});

export default function Colors() {
  // Interactive state for palette configuration
  const [lightness, setLightness] = useState(0.43);
  const [chroma, setChroma] = useState(0.4);
  const [hue, setHue] = useState(276);
  const [lowerCp, setLowerCp] = useState(1);
  const [upperCp, setUpperCp] = useState(1);
  const [torsion, setTorsion] = useState(-12);
  const [gamut, setGamut] = useState<Gamut>("p3");

  // Color space detection
  const [colorSpaceInfo, setColorSpaceInfo] = useState<ReturnType<
    typeof getColorSpaceSupport
  > | null>(null);

  useEffect(() => {
    // Detect on client side only
    const info = getColorSpaceSupport();
    setColorSpaceInfo(info);
    // Auto-select the best supported gamut
    setGamut(detectBestColorSpace());
  }, []);

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

  return (
    <Fade duration="short">
      <Container style={{ color: lightTextColor }}>
        <style jsx>{`
          input[type="range"] {
            accent-color: ${accentColor};
          }
        `}</style>
        <LegendButton href="/" fixed position="topLeft">
          Home
        </LegendButton>
        <PageHeading as="h1" size="xl">
          Palette Test - Interactive
        </PageHeading>
        <Subheading style={{ color: lightTextColor }}>
          Using @ch-ui/colors for perceptually uniform color generation
        </Subheading>

        {/* Interactive Controls */}
        <ControlPanel style={{ background: darkPanelColor }}>
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
              style={{ color: lightTextColor }}
            >
              <option value="rec2020">Rec. 2020 (ultra-wide gamut)</option>
              <option value="p3">Display P3 (wide gamut)</option>
              <option value="srgb">sRGB (standard)</option>
            </Select>
            <HelperText style={{ color: lightTextColor }}>
              Color space for output values
            </HelperText>
          </ControlGroup>
        </ControlPanel>

        {/* Palette Visualization */}
        <SectionHeading as="h2" size="lg">
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
          <SectionHeading as="h2" size="lg">
            Palette Details
          </SectionHeading>
          <Text css={{ marginBottom: "$5" }}>
            <strong>Gamut:</strong> {gamut} | <strong>Shades:</strong>{" "}
            {palette.length}
          </Text>
          {palette.map(({ shade, luminosity, color }) => (
            <DetailRow key={shade}>
              <ShadeLabel>{shade}</ShadeLabel>
              <ColorSwatch style={{ backgroundColor: color }} />
              <ColorValue>{color}</ColorValue>
              <LuminosityLabel>L={luminosity.toFixed(2)}</LuminosityLabel>
            </DetailRow>
          ))}
        </div>

        <div>
          <SectionHeading as="h2" size="lg">
            Configuration
          </SectionHeading>
          <CodeBlock
            style={{
              background: darkPanelColor,
              color: lightTextColor,
            }}
          >
            {`{
  lightness: ${lightness},
  chroma: ${chroma},
  hue: ${hue},
  lowerCp: ${lowerCp},
  upperCp: ${upperCp},
  torsion: ${torsion},
  gamut: '${gamut}'
}`}
          </CodeBlock>
          <InfoText css={{ marginTop: "$5" }}>
            <p>
              <strong>lightness</strong> (0-1): The lightness of the key color
            </p>
            <p>
              <strong>chroma</strong> (0-0.4): The colorfulness/saturation
            </p>
            <p>
              <strong>hue</strong> (0-360): The color angle (276° = purple-blue)
            </p>
            <p>
              <strong>lowerCp</strong>: Dark curve control (1 = straight)
            </p>
            <p>
              <strong>upperCp</strong>: Light curve control (1 = straight)
            </p>
            <p>
              <strong>torsion</strong>: Prevents undesirable color shifts (e.g.,
              "mustard problem")
            </p>
            <p>
              <strong>gamut</strong>: Color space (p3 = Display P3, srgb =
              standard RGB)
            </p>
          </InfoText>
        </div>

        {/* Color Space Support Info */}
        {colorSpaceInfo && (
          <div>
            <SectionHeading as="h2" size="lg">
              Color Space Support
            </SectionHeading>
            <InfoPanel style={{ background: darkPanelColor }}>
              <Text css={{ marginBottom: "$5" }}>
                <strong>Browser detected best gamut:</strong>{" "}
                <span
                  style={{
                    color: "#4CAF50",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {colorSpaceInfo.best}
                </span>
              </Text>
              <InfoGrid>
                <div>
                  <StatusLabel>sRGB</StatusLabel>
                  <StatusValue
                    style={{
                      color: colorSpaceInfo.srgb ? "#4CAF50" : "#f44336",
                    }}
                  >
                    {colorSpaceInfo.srgb ? "✓ Supported" : "✗ Not supported"}
                  </StatusValue>
                </div>
                <div>
                  <StatusLabel>Display P3</StatusLabel>
                  <StatusValue
                    style={{
                      color: colorSpaceInfo.p3 ? "#4CAF50" : "#f44336",
                    }}
                  >
                    {colorSpaceInfo.p3 ? "✓ Supported" : "✗ Not supported"}
                  </StatusValue>
                </div>
                <div>
                  <StatusLabel>Rec. 2020</StatusLabel>
                  <StatusValue
                    style={{
                      color: colorSpaceInfo.rec2020 ? "#4CAF50" : "#f44336",
                    }}
                  >
                    {colorSpaceInfo.rec2020 ? "✓ Supported" : "✗ Not supported"}
                  </StatusValue>
                </div>
              </InfoGrid>
              <InfoText
                css={{ marginTop: "$5" }}
                style={{ color: lightTextColor, opacity: 0.4 }}
              >
                <p>
                  <strong>Detection:</strong> Uses{" "}
                  <code>window.matchMedia("(color-gamut: ...)")</code> - the
                  same method CSS @media queries use to check your display
                  capabilities.
                </p>
                <p style={{ marginBottom: 0 }}>
                  <strong>Color spaces:</strong>
                  <br />• <strong>sRGB</strong>: Standard gamut (all displays)
                  <br />• <strong>Display P3</strong>: ~25% wider than sRGB
                  (modern displays)
                  <br />• <strong>Rec. 2020</strong>: Ultra-wide gamut (HDR
                  displays)
                </p>
              </InfoText>
            </InfoPanel>
          </div>
        )}
      </Container>
    </Fade>
  );
}
