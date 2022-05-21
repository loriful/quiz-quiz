const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    isInstructor: Boolean
    scores: [ScoresSchema]
  }

  type Questions {
    _id: ID
    question: String
    answersArr: [String]
    correct: Int
    num: Int
  }

  type Quiz {
    _id: ID
    quizTitle: String
    quizId: String
    quizQuestions: [Questions]
    points: Int
    class:  [Class]
    owner: [User]
    comments: [Comment]
    questionCount: Int
    commentCount: Int
  }

  type ScoresSchema {
    _id: ID
    quizId: String
    missed: [Int]
    tally: Int
  }

  type Comment {
    _id: ID
    writtenBy: String
    commentBody: String
    createdAt: String
    replies: [ReplySchema]
  }

  type ReplySchema {
    replyId: String
    replyBody: String
    writtenBy: String
    createdAt: String
  }

  type Class {
    _id: ID
    classname: String
    classId: String
    description: String
    instructor: String
    members: [User]
    quizIDs: [Quiz]
    quizCount: Int
  }

  type Query {
    users: [User]
    user(username: String!): User
    quizzes: [Quiz]
    quiz(quizTitle: String!): Quiz
    classes: [Class]
    class(classId: String!): Class
    instructors: [User]
    instructor(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, instructor: Boolean!): Auth
    
    addClass(classname: String!, classId: String!, instructor: String!, description: String): Class
    addQuiz(quizId: String!, quizTitle: String!, points: Int, class: String, owner: String): Quiz
    addQuestion(quizTitle: String!, question: String!, answersArr: [String], correct: Int): Questions
    tallyScores(username: String!, quizId: String!, missed: [Int], tally: Int!): User
    
    deleteUser(username: String!): User
    deleteClass(classId: String!): Class
    deleteQuiz(quizId: String!): Quiz
    deleteQuestion(quizId: String!, num: Int!): Quiz

    updateUser(username: String!, email: String, instructor: Boolean, scores: [String]): User
    updateQuiz(quizId: String!): Quiz
    updateClass(classid: String!): Class
  
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
