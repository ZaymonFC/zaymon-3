import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { ShaderBackground } from "../components/ShaderBackground";
import { GamutIndicator } from "../components/GamutIndicator";
import { logColorSpaceInfo } from "../lib/colorSpaceDetection";
import "../styles/fonts.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log color space info on app load
    logColorSpaceInfo();
  }, []);

  return (
    <ParallaxProvider>
      <ShaderBackground />
      <GamutIndicator />
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

export default MyApp;
