const sequelize = require('../config/connection');
const seedRoutines = require('./routinesData');
const seedUsers = require('./usersData')
const seedExercise = require('./exerciseData')

const sequelize = require('../config/connection');
const { User, Routine, Exercise } = require('../models');

const userData = require('./userData.json');
const routineData = require('./postData.json');
const exerciseData = require('./commentData.json');

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



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Promise.all(
    postData.map(async (post) => {
      const createdPost = await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
      return createdPost;
    })
  );

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();