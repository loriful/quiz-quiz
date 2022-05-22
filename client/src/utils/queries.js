import { gql } from '@apollo/client';

export const QUERY_QUIZ = gql`
  query quizzes($username: String) {
    quizzes(username: $username) {
      _id
      quizText
      username
    }
  }
`;