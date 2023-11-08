const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection')

const Users = require('./users')

class Routines extends Model { }

Routines.init(
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
        share: {
            type: DataTypes.BOOLEAN,
            notNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            notNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: Users,
                key: 'id'
            }
        },
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Routines',
    }
);

module.exports = Routines;