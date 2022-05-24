const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz, Class, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profile: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    getUsers: async () => {
      return User.find()
        .select('-__v -password')
        .sort({ _id: -1 });
    },
    getUser: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password');
    },
    getQuizzes: async () => {
      return Quiz.find()
      .select('-__v')
      .sort({ quizTitle: -1 });
    },
    getQuiz: async (parent, { quizId }) => {
      return Quiz.findOne({ quizId })
        .select('-__v');
    },
    getClasses: async () => {
      return Class.find()
        .select('-__v')
        .sort({ className: -1});
    },
    
    getClass: async (parent, { classId }) => {
      return Class.findOne({ classId })
        .select('-__v');
    },

    getInstructors: async () => {
      const selectUsers = User.find();
      return selectUsers.filter(x => selectUsers.instructor) 
        .select('-__v')
        .sort({ username: -1 });
    },
    getInstructor: async (parent, { insName }) => {
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

    addQuiz: async (parent, args, context) => {
      if (context.user && context.user.isInstructor) {
        return Quiz.create(args);
      };
      throw new AuthenticationError('Please log in first! You must be an instructor to create a quiz.');
    },

    addClass: async (parent, args, context) => {
      if (context.user && context.user.isInstructor) {
        return await Class.create(args);
        };
      throw new AuthenticationError('Please log in first!  You must be an instructor to create a class.');
    },
    
    addQuestion: async (parent, args, context) => {
      if (context.user && context.user.isInstructor) {
      const updatedQuiz = await Quiz.findOneAndUpdate (
        { quizId: args.quizId },
        { $push: { quizQuestions: { question: args.question, answersArr: args.answersArr, correct: args.correct }}},
        { new: true, runValidators: true });
      return updatedQuiz;
      };
      throw new AuthenticationError('Please log in first!  You must be an instructor to create quiz questions.');
   },

   deleteUser: async (parent, username, context) => {
    if (context.user) {
      return User.findOneAndDelete(username);
    };
    throw new AuthenticationError('Please log in first!');
  },

  deleteQuiz: async (parent, quizId, context) => {
    if (context.user && context.user.isInstructor) {
    return Quiz.findOneAndDelete(quizId);
    };
    throw new AuthenticationError('Please log in first!  You must be an instructor to delete a quiz.');
  },

  deleteQuestion: async (parent, args, context) => {
     if (context.user && context.user.isInstructor) {
        const updatedQuiz = await Quiz.findOneAndUpdate (
          { quizId: args.quizId },
          { $pull: { quizQuestions: args.num }},
          { new: true });
        return updatedQuiz;
      };
      throw new AuthenticationError('Please log in first!  You must be an instructor to delete questions.');
  },

  deleteClass: async (parent, className, context) => {
    if (context.user && context.user.isInstructor) {
      return Class.findOneAndDelete(className);
    };
    throw new AuthenticationError('Please log in first!  You must be an instructor to delete a class.');
  },
  
  tallyScores: async (parent, args, context) => {
    if (context.user) {
        const handleQuiz = await Quiz.findOne ({ quizId: args.quizId });
        if (handleQuiz) {
          const grade = 100 - (handleQuiz.points* args.missed.length);
          const updatedUser = await User.findOneAndUpdate (
            { username: args.username },
            { $push: { scores: { quizId: args.quizId, missed: args.missed, tally: grade }}},
            { new: true, runValidators: true });
          return updatedUser;
        };
        throw new AuthenticationError('Please select a valid quiz.');
    };
    throw new AuthenticationError('Please log in first!');
  },
  
  updateUser: async (parent, args, context) =>  {
      if (context.user) {
        return await User.findOneAndUpdate (
        { username: args.username}, 
        args,
        { new: true, runValidators: true});
        };

      throw new AuthenticationError('Please log in first!');    
  },

  updateQuiz: async (parent, args, context) =>  {
      if (context.user && context.user.isInstructor) {
         return await Quiz.findOneAndUpdate (
            { quizId: args.quizId }, 
            args,
            { new: true, runValidators: true});
        };
        throw new AuthenticationError('Please log in first!  You must be an instructor to update a quiz.');
    },

  updateClass: async (parent, args, context) =>  {
    if (context.user && context.user.isInstructor) {
        return await Class.findOneAndUpdate (
          { classsId: args.classId },
          args,
          { new: true, runValidators: true});
      };
    throw new AuthenticationError('Please log in first!  You must be an instructor to update a quiz.');
  }
}
};

module.exports = resolvers;
