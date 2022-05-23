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
  }

  type Quiz {
    _id: ID
    quizTitle: String
    quizId: String
    quizQuestions: [Questions]
    points: Int
    className:  String
    owner: String
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
    className: String
    classId: String
    description: String
    instructor: String
    enrollees: [User]
    quizIds: [Quiz]
    quizCount: Int
    enrolledCount: Int
  }

  type Query {
    getUsers: [User]
    getUser(username: String!): User

    getQuizzes: [Quiz]
    getQuiz(quizTitle: String!): Quiz

    getClasses: [Class]
    getClass(classId: String!): Class
    
    getInstructors: [User]
    getInstructor(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, isInstructor: Boolean!): Auth
    
    addClass(className: String!, classId: String!, instructor: String!): Class
    addQuiz(quizId: String!, quizTitle: String!, className: String!, points: Int!): Quiz
    addQuestion(quizTitle: String!, question: String!, answersArr: [String!]): Quiz
    tallyScores(username: String!, quizId: String!, missed: [Int!]): User
    
    deleteUser(username: String!): User
    deleteClass(classId: String!): Class
    deleteQuiz(quizId: String!): Quiz
    deleteQuestion(quizId: String!, num: Int!): Quiz

    updateUser(username: String!, email: String, isInstructor: Boolean, scores: [String]): User
    updateQuiz(quizId: String!, quizTitle: String, points: Int, owner: String, class: [String]): Quiz
    updateClass(classid: String!, className: String!, classId: String!, description: String, instructor: String): Class
  }

  type Auth {
    token: ID!
    user: User
    isInstructor: Boolean
  }
`;

module.exports = typeDefs;
