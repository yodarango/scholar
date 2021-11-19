import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
// import client from "../apollo-client";
import "../styles/globals.css";

// =========== connect to apollo
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//    if (graphQLErrors) {
//       graphQLErrors.map(({ message, path }) => {
//          console.log(`there was an error on ${path} please track it ${message}`);
//       });
//    }
// });

// const link = from([errorLink, new HttpLink({ uri: "http://192.168.1.16:4000" })]);

// const client = new ApolloClient({
//    cache: new InMemoryCache(),
//    uri:
// });

function MyApp({ Component, pageProps }: AppProps) {
   return <Component {...pageProps} />;
}

export default MyApp;
