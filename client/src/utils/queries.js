import { gql } from '@apollo/client';

// export const QUERY_USERS = gql`
//   query getUsers {
//     getUsers {
//     username
//     email
//     isInstructor
//     }
//   }
// `;

export const QUERY_USER = gql`
  query getUser ($username: String!) {
    getUser(username: $username) {
      _id
      username
      email
      isInstructor
      scores {
          quizId
          missed
          tally
    }
  }  
}
`;

// export const QUERY_QUIZZES = gql` 
//   query getQuizzes {
//     getQuizzes {
//       quizTitle
//       quizId
//       quizQuestions {
//         question
//         answersArr
//         correct
//       }
//       points
//       className
//       owner
//       questionCount
//     }
//   }
// `;

export const QUERY_QUIZ = gql` 
  query getQuiz($quizId: String!) {
    getQuiz(quizId: $quizId) {
      _id
      quizTitle
      quizId
      quizQuestions {
        question
        answersArr
        correct
      }
      className
      owner
    }
  }
`;

// export const QUERY_CLASSES = gql` 
//   query getClasses {
//     getClasses {
//     _id
//     className  
//     classId
//     description
//     enrollees {
//       username
//       }
//     enrolledCount
//   }
// `;

export const QUERY_CLASS = gql`
  query getClass($classId: String!) {
    getClass(classId: $classId) {
      className
      classId
      description
      enrollees {
        username
      }
      enrolledCount
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;