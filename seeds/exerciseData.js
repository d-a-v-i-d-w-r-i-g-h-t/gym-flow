const { Exercise } = require('../models');

const exerciseData = [
  {
    name: "Bench Press",
    weight: 185,
    reps: 10,
    routine_id: 1
  },
  {
    name: "Pec Flies",
    weight: 90,
    reps: 15,
    routine_id: 1
  },
  {
    name: "Bicep Curls",
    weight: 40,
    reps: 10,
    routine_id: 2
  },
  {
    name: "Tricep Curls",
    weight: 60,
    reps: 15,
    routine_id: 2
  },

];

const seedExercise = () => Exercise.bulkCreate(exerciseData);

module.exports = seedExercise;