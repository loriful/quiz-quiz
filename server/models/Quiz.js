const { Schema, model} = require('mongoose');
const classSchema = require('./Class');
const questionSchema = require('./Question');
const Comments = require('./Comment');
const User = require('./User');
const dateFormat = require('../utils/dateFormat');


const quizSchema = new Schema(
    {
        quizTitle: {
          type: String,
          minlength: 5,
          maxlength: 40,
          trim: true
        },
        quizId: {
          type: String,
          unique: true
        },
        quizQuestions: [questionSchema],
        points: {
          type: Number
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => dateFormat(timestamp)
        },
        className: {
          type: String
        },
        owner: {
          type: String,
          trim: true
        },
        comments: {
          type: Schema.Types.ObjectId,
          ref: "Comment"
        }
      },
      {
        toJSON: {
          getters: true,
          virtuals: true
        }
      }
);

quizSchema.virtual('questionCount').get(function() {
      return this.quizQuestions.length;
});
    
const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
    