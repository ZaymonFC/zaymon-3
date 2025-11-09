import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { ShaderBackground } from "../components/ShaderBackground";
import "../styles/fonts.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider>
      <ShaderBackground />
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

export default MyApp;
