const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        authors: String
        description: String
        bookId: String
        iamge: String
        link: String
        title: String
    }



    type Query {
        users: [User]
        user(username: String!): User
        }
    `;

module.exports = typeDefs;