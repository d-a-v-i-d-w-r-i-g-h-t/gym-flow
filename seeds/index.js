const sequelize = require('../config/connection');
const { User, Routine, Exercise, Comment } = require('../models');

const userData = require('./userData.json');
const routineData = require('./routineData.json');
const exerciseData = require('./exerciseData.json');
const commentData = require('./commentData.json');

const seedAll = async () => {
  try{

    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, { individualHooks: true });
    console.log('User data seeded successfully.');

    await Routine.bulkCreate(routineData);
    console.log('Routine data seeded successfully.');

    await Exercise.bulkCreate(exerciseData);
    console.log('Exercise data seeded successfully.');

    await Comment.bulkCreate(commentData);
    console.log('Comment data seeded successfully.');
    
  } catch (error) {
    console.error('Error trying to Seed:', error.stack || error.message)
  } finally {
    console.log('Database seeding completed.');
    process.exit(0);
  }
};

seedAll();
