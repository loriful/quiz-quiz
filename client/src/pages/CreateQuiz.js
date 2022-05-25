import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';


const CreateQuiz = () => {
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    return (
        <form>
        <label>Enter a name for your quiz:
          <br></br><input 
          type="text" 
          id="quizName"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        </label><br></br><br></br><br></br>
        <label>
            Question:
        <br></br><input 
        type="text" 
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}/>
        </label> <br></br><br></br>      
        <label>
            Answer Choice 1:
        <br></br><input 
        type="text" 
        id="choice1"
        value={answer1}
        onChange={(e) => setAnswer1(e.target.value)}
        />
        </label><br></br>        
        <label>
            Answer Choice 2:
        <br></br><input 
        type="text" 
        id="choice2"
        value={answer2}
        onChange={(e) => setAnswer2(e.target.value)}/>
        </label><br></br>       
        <label>
            Answer Choice 3:
        <br></br><input 
        type="text" 
        id="choice3"
        value={answer3}
        onChange={(e) => setAnswer3(e.target.value)}/>
        </label><br></br>
                <label>
            Answer Choice 4:
        <br></br><input 
        type="text" 
        id="choice4"
        value={answer4}
        onChange={(e) => setAnswer4(e.target.value)}/>
        </label>
        <br></br><br></br>
        <label>Which answer choice is the correct one?  </label>
        <select>
            <option value="ans1">1</option>
            <option value="ans2">2</option>
            <option value="ans3">3</option>
            <option value="ans4">4</option>
        </select><br></br>
        <button id="addQuestion">Save and add another question</button>
        <br></br>
        <button id="addQuestion">Save and finish quiz</button>
      </form>
    );
};

export default CreateQuiz;

