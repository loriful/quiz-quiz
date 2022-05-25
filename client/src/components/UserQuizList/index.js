import React from 'react';
import { Link } from 'react-router-dom';

const UserQuizList = ({ username }) => {
  if (!username.scores) {
    return <h3>No quizzes yet.</h3>;
  }

  return (
    <div>
      <h3>Your Quiz List</h3>
      {/* map the user quizes and query each for details and display
      /* add to the display scores */}
      {username.scores.quizId &&
        username.scores.quizId.map(quiz => (
          <div key={quiz._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {quiz}
              </Link>{' '}
            </p>
          </div>
     ))}
     </div>
   );
 };

export default UserQuizList;
