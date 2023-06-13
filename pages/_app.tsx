import type { AppProps } from "next/app";
import { NavigationMain } from "../components/layouts/navs/navigation_main";

// styles
// import "../styles/tokens.css";
// import "../styles/utilities.css";
import "../styles/globals_new.css";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <NavigationMain>
            <Component {...pageProps} />
         </NavigationMain>
      </>
   );
}

export default MyApp;
