import type { AppProps } from "next/app";

// styles
//import "../styles/globals.css";
import "../styles/globals_new.css";

function MyApp({ Component, pageProps }: AppProps) {
   return <Component {...pageProps} />;
}

export default MyApp;
