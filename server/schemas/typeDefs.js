const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    instructor: Boolean
  }

  type Quiz {
    _id: ID
    quizTitle: String
    quizAnswer: Int
    classname: String
    commentCount: Int
    questionCount: Int
  }

  type Query {
    users: [User]
    user(username: String!): User
    quizes(quizTitle: String): [Quiz]
    quiz(_id: ID!): Quiz
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, instructor: Boolean!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
