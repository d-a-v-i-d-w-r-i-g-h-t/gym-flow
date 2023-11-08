const sequelize = require('../config/connection');
const seedRoutines = require('./routinesData');
const seedUsers = require('./usersData')
const seedExercise = require('./exerciseData')

const seedAll = async () => {
  try{
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedRoutines();

  await seedExercise();
  } catch (err) {
    console.error('Error trying to Seed:', err)
    return;
  }

  process.exit(0);
};

seedAll();