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
          required: 'You must provide a title.',
          minlength: 5,
          maxlength: 40,
          unique: true,
          trim: true
        },
        quizId: {
          type: String,
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
        classname: {
          type: Schema.Types.ObjectId,
          ref: "Class"
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User"
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

quizSchema.virtual('commentCount').get(function() {
      return this.comments.length;
});

quizSchema.virtual('questionCount').get(function() {
      return this.quizQuestions.length;
});
    
const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
    