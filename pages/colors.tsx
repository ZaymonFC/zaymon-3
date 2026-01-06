import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  generatePalette,
  shadeNumbers,
  type PaletteShade,
} from "../lib/colors";
import { useDetectColorSpaceInfo } from "../hooks/useDetectColorSpaceInfo";
import {
  palettePlaygroundAtom,
  type PalettePlaygroundConfig,
} from "../lib/palettePlaygroundState";
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
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 60px), 1fr))",
  gap: "$3",
});

const PaletteSwatch = styled("div", {
  aspectRatio: "1 / 2",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "$4",
  fontSize: "$1",
  fontWeight: "bold",
});

const DetailRow = styled("div", {
  display: "flex",
  gap: "$4",
  marginBottom: "$3",
  alignItems: "center",
});

const ShadeLabel = styled("div", {
  minWidth: "36px",
  fontWeight: "bold",
});

const ColorSwatch = styled("div", {
  width: "40px",
  height: "20px",
  flexShrink: 0,
});

const ColorValue = styled("div", {
  flex: 1,
  fontSize: "$2",
  fontFamily: "$mono",
  minWidth: 0,
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
  const [config, setConfig] = useAtom(palettePlaygroundAtom);

  const updateConfig = <K extends keyof PalettePlaygroundConfig>(
    key: K,
    value: PalettePlaygroundConfig[K],
  ) => setConfig((prev) => ({ ...prev, [key]: value }));

  const { colorSpaceInfo, detectedGamut } = useDetectColorSpaceInfo();
  useEffect(() => {
    updateConfig("gamut", detectedGamut);
  }, [detectedGamut]);

  const { copy, buttonText } = useCopyToClipboard({
    copyText: "Copy Palette Config",
    copiedText: "Copied!",
    getText: () => JSON.stringify(config, null, 2),
  });

  const generatedPalette = generatePalette(config);

  const palette = shadeNumbers.map((shade) => ({
    shade,
    luminosity: (1000 - shade) / 1000,
    color: generatedPalette[shade],
  }));

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
          Color Playground
        </PageHeading>
        <Subheading style={{ color: lightTextColor }}>
          Using @ch-ui/colors for perceptually uniform color palette generation
        </Subheading>

        {/* Interactive Controls */}
        <ControlPanel style={{ background: darkPanelColor, borderColor }}>
          <ControlGroup>
            <Label>
              Hue: <strong>{config.hue}°</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="360"
              step="1"
              value={config.hue}
              onChange={(e) => updateConfig("hue", parseInt(e.target.value))}
            />
            <HelperText style={{ color: lightTextColor }}>
              Color angle (0=red, 120=green, 240=blue)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Lightness: <strong>{config.lightness.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.lightness}
              onChange={(e) =>
                updateConfig("lightness", parseFloat(e.target.value))
              }
            />
            <HelperText style={{ color: lightTextColor }}>
              Key color lightness (0 = black, 1 = white)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Chroma: <strong>{config.chroma.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={config.chroma}
              onChange={(e) =>
                updateConfig("chroma", parseFloat(e.target.value))
              }
            />
            <HelperText style={{ color: lightTextColor }}>
              Colorfulness/saturation intensity
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Lower CP: <strong>{config.lowerCp.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={config.lowerCp}
              onChange={(e) =>
                updateConfig("lowerCp", parseFloat(e.target.value))
              }
            />
            <HelperText style={{ color: lightTextColor }}>
              Dark curve control (1 = straight)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Upper CP: <strong>{config.upperCp.toFixed(2)}</strong>
            </Label>
            <RangeInput
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={config.upperCp}
              onChange={(e) =>
                updateConfig("upperCp", parseFloat(e.target.value))
              }
            />
            <HelperText style={{ color: lightTextColor }}>
              Light curve control (1 = straight)
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Torsion: <strong>{config.torsion}</strong>
            </Label>
            <RangeInput
              type="range"
              min="-50"
              max="50"
              step="1"
              value={config.torsion}
              onChange={(e) =>
                updateConfig("torsion", parseInt(e.target.value))
              }
            />
            <HelperText style={{ color: lightTextColor }}>
              Hue rotation to prevent color shifts
            </HelperText>
          </ControlGroup>

          <ControlGroup>
            <Label>
              Gamut: <strong>{config.gamut}</strong>
            </Label>
            <Select
              value={config.gamut}
              onChange={(e) => updateConfig("gamut", e.target.value as Gamut)}
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
            <strong>Gamut:</strong> {config.gamut} | <strong>Shades:</strong>{" "}
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
