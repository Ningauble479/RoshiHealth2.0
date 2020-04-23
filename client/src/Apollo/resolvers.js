import gql from "graphql-tag";

export const typeDefs = gql`

type User {
  _id: ID!
  userName: String!
  email: String!
}

  extend type Query {
    isLoggedIn: Boolean!
    bigChungus: Boolean!
    user: User
  }

  extend type AuthPayload {
    user: User
}

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload
  }
`;



export const resolvers = {

  Mutation: {
    login: () => {
      console.log('hello')
  },
  }

};

