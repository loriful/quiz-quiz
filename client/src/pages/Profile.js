import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

// import ThoughtList from '../components/ThoughtList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_PROFILE, {
    variables: { username: userParam }
  });

  const user = data?.profile || data?.user || {};
  // console.log('user = ' + JSON.stringify(user) );

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


  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
         Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <div>Need to add an action from profile, maybe add class.</div>
          {/* <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`}  */}
          {/* /> */}

        </div>
      </div>
    </div>
  );
};

export default Profile;