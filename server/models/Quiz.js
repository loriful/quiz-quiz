const { Schema, model} = require('mongoose');
// const comment = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const quizObject = new Schema(
    {
        question: {
            type: String,
        },
        answers: [],        
        correct: {
            type: Number
        }    
    }  
)

const quizSchema = new Schema(
    {
        quizTitle: {
          type: String,
          required: 'You must provide a title.',
          minlength: 15,
          maxlength: 40
        },
        quizQuestions: [quizObject],
        createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => dateFormat(timestamp)
        },
        classname: {
          type: String,
          required: 'You must provide a class name.'
        },
        comments: []
      },
      {
        toJSON: {
          getters: true,
          virtuals: true
        }
      }
    )
    
quizSchema.virtual('commentCount').get(function() {
      return this.comments.length;
});

quizSchema.virtual('questionCount').get(function() {
      return this.quizQuestions.length;
});
    
const Quiz = model('Quiz', quizSchema);
    
module.exports = Quiz;
    