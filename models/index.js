const User = require('./User');
const Routine = require('./Routine');
const Exercise = require('./Exercise');

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

// routine and comment: one to many
Routine.hasMany(Comment, {
  foreignKey: 'routine_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Routine, {
  foreignKey: 'routine_id'
})

// user and comment: one to many
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})


module.exports = { User, Routine, Exercise };