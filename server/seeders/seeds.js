// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const quizSeeds = require('./quizSeed.json');
const classSeeds = require('./classSeed.json');
const db = require('../config/connection');
const { User, Quiz, Class } = require('../models');

db.once('open', async () => {
  try {
    await Quiz.deleteMany({});
    await User.deleteMany({});
    await Class.deleteMany({});
    
    await User.create(userSeeds); 
    await Quiz.create(quizSeeds); 
    
    for (let i = 0; i < classSeeds.length; i++) {
      const { _id, className } = await Class.create(classSeeds[i]);
      await Quiz.findOneAndUpdate(
          { className: className },   
          { $push: {quizIds: {_id }}});
      };
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
