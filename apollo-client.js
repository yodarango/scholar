import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const Cookies = require("js-cookie");
const isAuth = Cookies.get("authorization");

const defaultOptions = {
   watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
   },
   query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
   }
};

// const httpLink = new HttpLink({
//    uri: "https://localhost:4000/api"
// });

const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
   if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
         console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );

   if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
   uri: "https://my.biblescholar.app/api",
   //uri: "http://localhost:4000/api",
   cache: new InMemoryCache(),
   defaultOptions: defaultOptions,
   //credentials: "include",
   headers: {
      authorization: isAuth
   }
});

export default client;
