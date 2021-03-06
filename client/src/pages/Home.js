import React from 'react';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_PROFILE_SHORT } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  const { data: userData } = useQuery(QUERY_PROFILE_SHORT);
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Available Quizzes" />
          )}
          {/* provide for different user experience when logged in */}
          {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <div>User is logged in, show them some love with quizzes and classes</div>
          </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;
