const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init(
  {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    routine_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    createdAt: {
      type: Datatypes.DATE,
      allowNull: false,
        defaultValue: Datatypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
  }
);

module.exports = Like;