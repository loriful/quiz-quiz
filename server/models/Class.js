const { Schema, model } = require('mongoose');
const User = require('./User');
const Quiz = require('./Quiz');

const ClassSchema = new Schema(
    {
        classname: {
            type: String,
            required:  "Class name is required.",
            trim: true
        },
        classId: {
            type: String,
            trim: true,
            require: true
        },
        description: {
            type: String,
            maxlength: 180
        },
        instructor: {
            type: String,
            trim: true,
            require: true
        },
        members: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        quizIds: {
            type: [Schema.Types.ObjectId],
            ref: "Quiz"
        }
    },
    {
      toJSON: {
        getters: true,
        virtuals: true
      }
    }
  );

ClassSchema.virtual('quizCount').get(function() {
    return this.quizIds.length;
});
  
  const Class = model('Class', ClassSchema);
  
  module.exports = Class;
  