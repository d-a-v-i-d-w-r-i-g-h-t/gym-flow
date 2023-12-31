const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Routine extends Model { }

Routine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        routine_name: {
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
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },    
        user_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'routine',
    }
);

module.exports = Routine;