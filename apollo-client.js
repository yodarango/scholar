import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
   uri: "https://scholar-be-2.herokuapp.com/api",
   cache: new InMemoryCache()
});

export default client;
