const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'user';

const UserSchema = {
    iduser: {
        field: 'id_user',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
};

class User extends Model {
    static associate(models) {
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        };
    };
};

module.exports = {
    User,
    UserSchema,
    USER_TABLE
};