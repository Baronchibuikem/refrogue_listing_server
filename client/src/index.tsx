import React from "react";
import { render } from "react-dom";
import { Listings } from "./sections";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "http://localhost:9000/api",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Listings title="The Listings Section component" />
  </ApolloProvider>,
  document.getElementById("root")
);
