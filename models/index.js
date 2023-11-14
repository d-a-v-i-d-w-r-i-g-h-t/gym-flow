const User = require('./User');
const Routine = require('./Routine');
const Exercise = require('./Exercise');
const Comment = require('./Comment');
const Like = require('./Like');

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

// user and routine: many to many, through Comment
User.belongsToMany(Routine, {
  through: Comment,
  onDelete: 'CASCADE',
});
Routine.belongsToMany(User, {
  through: Comment,
  onDelete: 'CASCADE',
});

// user and routine: many to many, through Like
User.belongsToMany(Routine, {
  through: Like,
  onDelete: 'CASCADE',
});
Routine.belongsToMany(User, {
  through: Like,
  onDelete: 'CASCADE',
});


module.exports = { User, Routine, Exercise, Comment, Like };