import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';


const CreateQuiz = () => {
    return (
        <form>
        <label>Enter a name for your quiz:
          <br></br><input type="text" />
        </label><br></br><br></br><br></br>
        <label>
            Question:
        <br></br><input type="text" />
        </label> <br></br><br></br>      
        <label>
            Answer Choice 1:
        <br></br><input type="text" />
        </label><br></br>        
        <label>
            Answer Choice 2:
        <br></br><input type="text" />
        </label><br></br>       
        <label>
            Answer Choice 3:
        <br></br><input type="text" />
        </label><br></br>
                <label>
            Answer Choice 4:
        <br></br><input type="text" />
        </label>
      </form>
    );
};

export default CreateQuiz;

