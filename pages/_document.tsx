import { Html, Head, Main, NextScript } from "next/document";
import { getCssText, bluePalettes } from "../Stitches";
import { generateGamutCSS } from "../lib/gamutStyles";

export default function Document() {
  // Generate CSS with media queries for gamut-specific colors
  const gamutCSS = generateGamutCSS(bluePalettes, "blue");

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
