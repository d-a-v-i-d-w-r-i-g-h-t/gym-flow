const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model { }

Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            notNull: true,
        },
        weight: {
            type: DataTypes.INTEGER,
            notNull: true,
        },
        reps: {
            type: DataTypes.INTEGER,
            notNull: true,
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
        modelName: 'exercise',
    }
);

module.exports = Exercise ;