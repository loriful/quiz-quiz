import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import UserQuizList from '../components/UserQuizList';
// import QuizForm from '../components/QuizForm';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_PROFILE } from '../utils/queries';
// import { ADD_QUIZ } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();

  // const [addQuiz] = useMutation(ADD_QUIZ);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_PROFILE, {
    variables: { username: userParam }
  });

  const user = data?.profile || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user?.username) {
    return (
      <h4>
        You must be logged in view data. Use the links above to sign up or log in!
      </h4>
    );
  }

  // const handleClick = async () => {
  //   try {
  //     await addQuiz({
  //       variables: { username: user.username },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
        {userParam ? `${user.username}'s` : 'Your'} profile: <br></br>
         Email: {user.email} <br></br>
         User:  {user.username}
        </h2>

      {/* {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Quiz
          </button>
        )} */}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <UserQuizList username={user.username}/>
          {/* //  title={`${user.username}'s quizzes...`}/> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;