const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../config/connection')

class Users extends Model { 

checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
};
}

Users.init(
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
        modelName: 'Users',
    }
);

module.exports = Users;