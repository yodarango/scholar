import { NavigationMain } from "../components/layouts/navs/navigation_main";
import { UserContextProvider } from "../context";
import type { AppProps } from "next/app";

// styles
// import "../styles/tokens.css";
// import "../styles/utilities.css";
import "../styles/globals_new.css";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <UserContextProvider>
            <NavigationMain>
               <Component {...pageProps} />
            </NavigationMain>
         </UserContextProvider>
      </>
   );
}

export default MyApp;
