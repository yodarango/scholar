import { ApolloClient, InMemoryCache } from "@apollo/client";

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

const client = new ApolloClient({
   //uri: "http://localhost:4000/api",
   //uri: "http://172.20.10.7:4000/api",
   //uri: "http://192.168.1.16:4000/api",
   uri: "https://scholar-be-2.herokuapp.com/api",
   cache: new InMemoryCache(),
   defaultOptions: defaultOptions
});

export default client;
