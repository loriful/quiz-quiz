import React from "react";
import ThoughtList from "../components/ThoughtList";

import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <ThoughtList thoughts={thoughts} title="Available Quizzes" />
              <img src="https://blog.hubspot.com/hubfs/google-quiz.jpg"></img>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
