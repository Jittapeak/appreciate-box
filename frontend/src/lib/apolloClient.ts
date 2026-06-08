
import { ApolloLink, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const gqlClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
  }),
  cache: new InMemoryCache(),
});
