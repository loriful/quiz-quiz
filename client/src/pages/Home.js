import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_QUIZ } from '../utils/queries';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_QUIZ);
  //const { data: userData } = useQuery(QUERY_ME_BASIC);
  // check if quiz data exists, if yes store in quizzes constant, if no save an empty array
  const quizzes = data?.quizzes|| [];

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{/* PRINT QUIZ LIST */}</div>
      </div>
    </main>
  );
};

export default Home;
