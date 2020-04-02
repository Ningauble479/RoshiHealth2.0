import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    bigChungus: Boolean!
  }

  extend type User {
    id: ID!
    userName: String
    email: String
  }
`;

export const resolvers = {};