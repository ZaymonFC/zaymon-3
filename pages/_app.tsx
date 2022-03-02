import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import "../styles/fonts.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

export default MyApp;
