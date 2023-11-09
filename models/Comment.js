const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
      id: {
          type: DataTypes.INTEGER,
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
      },
      text: {
          type: DataTypes.STRING,
          notNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        references: {
            model: 'user',
            key: 'id',
        }
      },
      routine_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        references: {
            model: 'routine',
            key: 'id',
        }
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment ;