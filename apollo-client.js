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

const httpLink = new HttpLink({
   uri: "http://localhost:4000/api"
});

const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
   if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
         console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );

   if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
   //uri: process.env.NEXT_PUBLIC_BACKEND_SOURCE,
   uri: "http://96.30.194.79:4000/api",
   //uri: "http://172.20.10.7:4000/api", //iphone
   //uri: "http://192.168.1.16:4000/api",
   //uri: "https://scholar-be-2.herokuapp.com/api",
   //link: from([errorLink, httpLink]),
   cache: new InMemoryCache(),
   defaultOptions: defaultOptions,
   //credentials: "include",
   headers: {
      authorization: isAuth
   }
});

export default client;
