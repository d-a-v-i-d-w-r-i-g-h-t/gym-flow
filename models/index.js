const Users = require('./users');
const Routines = require('./routines');
const Exercise = require('./exercise');

Routines.belongsTo(Users, {
  foreignKey: 'user_id',
});

Users.hasMany(Routines, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Routines.hasMany(Exercise, {
  foreignKey: 'routine_id',
  onDelete: 'CASCADE',
});

Exercise.belongsTo(Routines, {
  foreignKey: 'routine_id'
})


module.exports = { Users, Routines, Exercise };