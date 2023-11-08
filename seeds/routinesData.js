const { Routines } = require('../models');

const routineData = [
  {
    name: 'Chest',
    share: false,
    description: "A routine build for a chest day",
    user_id: 1,
  },
  {
    name: 'Arms',
    share: false,
    description: "A routine build for a Arms",
    user_id: 2,
  },

];

const seedRoutines = () => Routines.bulkCreate(routineData);

module.exports = seedRoutines;