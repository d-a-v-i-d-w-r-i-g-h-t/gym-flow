const { Users } = require('../models');

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

const seedUsers = () => Users.bulkCreate(userdata);

module.exports = seedUsers;