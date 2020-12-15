import { gql } from "apollo-server-express";

// The gql tag helps parse the string we’ve created into a GraphQL Abstract Syntax tree and Apollo
// Server requires us to use it to wrap our schema

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  type Query {
      listings: [Listing!]!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
    }
`;
