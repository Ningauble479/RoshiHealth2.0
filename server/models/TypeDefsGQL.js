const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Subscription {
        userAdded: User
    }
    type User {
        _id: ID!
        userName: String
        email: String
    }
    type AuthPayload {
        user: User
    }
    type Query {
        getUsers: [User]
        currentUser: User
    }
    type Mutation {
        updateUser(_id: ID!, userName: String!, email: String!): User
        login(email: String!, password: String!): AuthPayload
        signup(userName: String!, email: String!, password: String!): AuthPayload
    }
`;

module.exports = typeDefs