const User = require('./users');
const Routine = require('./routines');
const Exercise = require('./exercises');

// associations

// user and routine: one to many
User.hasMany(Routine, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Routine.belongsTo(User, {
  foreignKey: 'user_id',
});

// routine and exercise: one to many
Routine.hasMany(Exercise, {
  foreignKey: 'routine_id',
  onDelete: 'CASCADE',
});

Exercise.belongsTo(Routine, {
  foreignKey: 'routine_id'
})


module.exports = { User, Routine, Exercise };