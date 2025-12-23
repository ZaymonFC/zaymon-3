import { useState, useEffect } from "react";
import { generatePalette, type PaletteShade } from "../lib/colors";
import {
  detectBestColorSpace,
  getColorSpaceSupport,
} from "../lib/colorSpaceDetection";
import type { Gamut } from "@ch-ui/colors";

export default function PaletteTest() {
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

  return (
    <div style={{ padding: "40px", fontFamily: "monospace", color: "white" }}>
      <h1>Palette Test - Interactive</h1>
      <p style={{ color: "#999", marginBottom: "30px" }}>
        Using @ch-ui/colors for perceptually uniform color generation
      </p>

      {/* Interactive Controls */}
      <div
        style={{
          background: "#222",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Lightness: <strong>{lightness.toFixed(2)}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={lightness}
            onChange={(e) => setLightness(parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Key color lightness (0 = black, 1 = white)
          </div>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Chroma: <strong>{chroma.toFixed(2)}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.01"
            value={chroma}
            onChange={(e) => setChroma(parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Colorfulness/saturation intensity
          </div>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Hue: <strong>{hue}°</strong>
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={hue}
            onChange={(e) => setHue(parseInt(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Color angle (0=red, 120=green, 240=blue)
          </div>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Lower CP: <strong>{lowerCp.toFixed(2)}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={lowerCp}
            onChange={(e) => setLowerCp(parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Dark curve control (1 = straight)
          </div>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Upper CP: <strong>{upperCp.toFixed(2)}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={upperCp}
            onChange={(e) => setUpperCp(parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Light curve control (1 = straight)
          </div>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Torsion: <strong>{torsion}</strong>
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            step="1"
            value={torsion}
            onChange={(e) => setTorsion(parseInt(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Hue rotation to prevent color shifts
          </div>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Gamut: <strong>{gamut}</strong>
          </label>
          <select
            value={gamut}
            onChange={(e) => setGamut(e.target.value as Gamut)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              backgroundColor: "#333",
              color: "white",
              border: "1px solid #555",
              borderRadius: "4px",
            }}
          >
            <option value="rec2020">Rec. 2020 (ultra-wide gamut)</option>
            <option value="p3">Display P3 (wide gamut)</option>
            <option value="srgb">sRGB (standard)</option>
          </select>
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Color space for output values
          </div>
        </div>
      </div>

      {/* Color Space Support Info */}
      {colorSpaceInfo && (
        <div
          style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            border: "1px solid #333",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Color Space Support</h2>
          <div style={{ marginBottom: "15px" }}>
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
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", color: "#999" }}>sRGB</div>
              <div
                style={{
                  fontSize: "20px",
                  color: colorSpaceInfo.srgb ? "#4CAF50" : "#f44336",
                }}
              >
                {colorSpaceInfo.srgb ? "✓ Supported" : "✗ Not supported"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#999" }}>Display P3</div>
              <div
                style={{
                  fontSize: "20px",
                  color: colorSpaceInfo.p3 ? "#4CAF50" : "#f44336",
                }}
              >
                {colorSpaceInfo.p3 ? "✓ Supported" : "✗ Not supported"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#999" }}>Rec. 2020</div>
              <div
                style={{
                  fontSize: "20px",
                  color: colorSpaceInfo.rec2020 ? "#4CAF50" : "#f44336",
                }}
              >
                {colorSpaceInfo.rec2020 ? "✓ Supported" : "✗ Not supported"}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "15px",
              fontSize: "12px",
              color: "#888",
              lineHeight: "1.6",
            }}
          >
            <p>
              <strong>Detection:</strong> Uses{" "}
              <code>window.matchMedia("(color-gamut: ...)")</code> - the same
              method CSS @media queries use to check your display capabilities.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Color spaces:</strong>
              <br />• <strong>sRGB</strong>: Standard gamut (all displays)
              <br />• <strong>Display P3</strong>: ~25% wider than sRGB (modern
              displays)
              <br />• <strong>Rec. 2020</strong>: Ultra-wide gamut (HDR
              displays)
            </p>
          </div>
        </div>
      )}

      {/* Palette Visualization */}
      <h2>Palette</h2>
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {palette.map(({ shade, color }) => (
          <div
            key={shade}
            style={{
              width: "60px",
              height: "120px",
              backgroundColor: color,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "8px",
              fontSize: "12px",
              color: shade < 500 ? "#000" : "#fff",
              fontWeight: "bold",
            }}
          >
            {shade}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Palette Details</h2>
        <div style={{ fontSize: "12px", marginBottom: "10px" }}>
          <strong>Gamut:</strong> {gamut} | <strong>Shades:</strong>{" "}
          {palette.length}
        </div>
        {palette.map(({ shade, luminosity, color }) => (
          <div
            key={shade}
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <div style={{ width: "60px", fontWeight: "bold" }}>{shade}</div>
            <div
              style={{
                width: "40px",
                height: "20px",
                backgroundColor: color,
                border: "1px solid #ccc",
              }}
            />
            <div
              style={{
                flex: 1,
                fontSize: "13px",
                fontFamily: "Monaco, monospace",
              }}
            >
              {color}
            </div>
            <div style={{ fontSize: "11px", color: "#999" }}>
              L={luminosity.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Configuration</h2>
        <pre
          style={{
            background: "#222",
            padding: "15px",
            borderRadius: "4px",
            fontSize: "12px",
            overflow: "auto",
            color: "white",
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
        </pre>
        <div style={{ marginTop: "15px", fontSize: "14px", lineHeight: "1.6" }}>
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
        </div>
      </div>
    </div>
  );
}
