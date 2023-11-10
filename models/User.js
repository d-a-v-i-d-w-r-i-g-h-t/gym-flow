const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt');

class User extends Model { 

    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            notNull: true,
        },
        email: {
            type: DataTypes.STRING,
            notNull: true,
        },
        password: {
            type: DataTypes.STRING,
            notNull: true,
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;