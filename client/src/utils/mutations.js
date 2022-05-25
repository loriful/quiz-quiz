import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $isInstructor: Boolean!) {
    addUser(username: $username, email: $email, password: $password, isInstructor: $isInstructor) {
      token
      user {
        _id
        username
        email
        isInstructor
      }
    }
  }
`;

export const ADD_QUIZ = gql`
  mutation updateUser($username: String!, $scores: [String]) {
    updateUser(username: $username, scores: $scores) {
      scores {
        quizId
      }
    }
  }
`;