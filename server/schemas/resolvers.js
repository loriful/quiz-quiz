const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz, Class, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .sort({ _id: -1 });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password');
    },
    quizzes: async () => {
      return Quiz.find()
      .select('-__v')
      .sort({ quizTitle: -1 });
    },
    quiz: async (parent, { quizId }) => {
      return Quiz.findOne({ quizId })
        .select('-__v');
    },
    classes: async () => {
      return Class.find()
        .select('-__v')
        .sort({ classname: -1});
    },
    
    class: async (parent, { classId }) => {
      return Class.findOne({ classId })
        .select('-__v');
    },

    instructors: async () => {
      const selectUsers = User.find();
      return selectUsers.filter(x => selectUsers.instructor) 
        .select('-__v')
        .sort({ username: -1 });
    },
    instructor: async (parent, { insName }) => {
      return User.fineOne({ insName })
        .select('__v');
      }
    },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addQuiz: async (parent, args) => {
      const quiz = await Quiz.create(args);
      return quiz;
    },

    addClass: async (parent, args) => {
      const newClass = await Class.create(args);
      return newClass;
    },
    
    addQuestion: async (parent, args) => {
      const updatedQuiz = await Quiz.findOneAndUpdate (
        { quizId: args.quizId },
        { $push: { quizQuestions: { question: args.question, answersArr: args.answersArr, correct: args.correct }}},
        { new: true, runValidators: true });
      return updatedQuiz;
   },

   deleteUser: async (parent, username) => {
    return User.findOneAndDelete(username);
  },

   deleteQuiz: async (parent, quizId) => {
     return Quiz.findOneAndDelete(quizId);
   },

   deleteQuestion: async (parent, args) => {
    const updatedQuiz = await Quiz.findOneAndUpdate (
      { quizId: args.quizId },
      { $pull: { quizQuestions: args.num }},
      { new: true });
      return updatedQuiz;
  },

  deleteClass: async (parent, classname) => {
    return Class.findOneAndDelete(classname);
  },
  
  tallyScores: async (parent, args) => {
    const updatedUser = await User.findOneAndUpdate (
      { username: args.username },
      { $push: { scores: { quizId: args.quizId, missed: args.missed, tally: args.tally }}},
      { new: true, runValidators: true });
    return updatedUser;
    },
  
    updateUser: async (parent, args) =>  {
       return await User.findOneAndUpdate (
         { username: args.username },
         args,
         { new: true, runValidators: true});
    },

    updateQuiz: async (parent, args) =>  {
        return await Quiz.findOneAndUpdate (
          { quizId: args.quizId }, 
          args,
          { new: true, runValidators: true});
    },

    updateClass: async (parent, args) =>  {
        return await Class.findOneAndUpdate (
          { classsId: args.classId },
          args,
          { new: true, runValidators: true});
    }
}
};

module.exports = resolvers;
