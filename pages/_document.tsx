import { Html, Head, Main, NextScript } from "next/document";
import {
  getCssText,
  bluePalettes,
  goldPalettes,
  redPalettes,
  aquaPalettes,
} from "../Stitches";
import { generateGamutCSS } from "../lib/gamutStyles";

export default function Document() {
  // Generate CSS with media queries for gamut-specific colors
  // Third argument (true) enables primary palette alias generation
  const blueCSS = generateGamutCSS(bluePalettes, "blue", true);
  const goldCSS = generateGamutCSS(goldPalettes, "gold", false);
  const redCSS = generateGamutCSS(redPalettes, "red", false);
  const aquaCSS = generateGamutCSS(aquaPalettes, "aqua", false);

  const gamutCSS = [blueCSS, goldCSS, redCSS, aquaCSS].join("\n\n");

  return (
    <Html lang="en">
      <Head>
        {/* Inject Stitches CSS */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        {/* Inject gamut-specific CSS with media queries */}
        <style
          id="gamut-colors"
          dangerouslySetInnerHTML={{ __html: gamutCSS }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
