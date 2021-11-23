import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
   uri: "http://localhost:4000/api",
   //uri: "https://scholar-be-2.herokuapp.com/api",
   cache: new InMemoryCache()
});

export default client;
