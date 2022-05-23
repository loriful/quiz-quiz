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
    
    await Class.create(classSeeds);
    
    for (let i = 0; i < quizSeeds.length; i++) {
      const { _id, classId } = await Class.create(classSeeds[i]);
      await Quiz.findOneAndUpdate(
          { classname: _id },   // finish when models have been updated
          { classname: _id });
      };
    
    const allClass = await getClasses();
    for (let i = 0; i < allClass.length; i==) {
      await User.findOneAndUpdate(
        {classname: allClass[i]},
      );
    };
    
    
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
