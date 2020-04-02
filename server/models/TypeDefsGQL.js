const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Subscription {
        userAdded: User
    }
    type User {
        id: ID!
        userName: String
        email: String
        password: String
    }
    type Query {
        getUsers: [User]
    }
    type Mutation {
        updateUser(id: ID!, userName: String!, email: String!): User
    }
`;

module.exports = typeDefs