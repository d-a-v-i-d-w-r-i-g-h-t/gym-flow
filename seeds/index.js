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

    await Routine.bulkCreate(routineData);

    await Exercise.bulkCreate(exerciseData);

    await Comment.bulkCreate(commentData);
    
  } catch (err) {
    console.error('Error trying to Seed:', err)
    return;
  }

  process.exit(0);
};

seedAll();
