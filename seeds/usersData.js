const { User } = require('../models');

const userdata = [
  {
    user_name: 'SteveRay',
    password: 'SteveRay',
  },
  {
    user_name: 'SarahParker',
    password: 'twentyone',
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;