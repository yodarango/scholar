import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// --------- switching to local storage because apple has a bug that expires cookies at session time
// const Cookies = require("js-cookie");
// const isAuth = Cookies.get("authorization");

let isAuth;
if (typeof window != "undefined") {
   const localJWT = localStorage.getItem("auth");

   if (localJWT) {
      const auth = JSON.parse(localJWT).auth;
      const expiresIn = JSON.parse(localJWT).expiresIn;

      // get todays date
      const today = Date.now() - 3600000;

      if (expiresIn < today) {
         isAuth = null;
      } else {
         isAuth = auth;
      }
   } else {
      isAuth = null;
   }
}

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
   //uri: "https://my.biblescholar.app/api",
   uri: "http://localhost:4000/api",
   //uri: "http://172.20.10.7:4000/api",
   cache: new InMemoryCache(),
   defaultOptions: defaultOptions,
   //credentials: "include",
   headers: {
      authorization: isAuth
   }
});

export default client;
