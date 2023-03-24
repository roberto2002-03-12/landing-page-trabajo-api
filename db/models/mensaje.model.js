const { Model, DataTypes, Sequelize } = require('sequelize');

const MENSAJE_TABLE = 'mensaje';

/*
    nombreCompleto,
    numeroCelular,
    mensaje,
*/

const MensajeSchema = {
    idmensaje: {
        field: 'id_mensaje',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombreCompleto: {
        field: 'nombre_completo',
        allowNull: false,
        type: DataTypes.STRING(95)
    },
    numeroCelular: {
        field: 'numero_celular',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    mensaje: {
        allowNull: false,
        type: DataTypes.TEXT('medium')
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
};

class Mensaje extends Model {
    static associate(models) {
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: MENSAJE_TABLE,
            modelName: 'Mensaje',
            timestamps: false
        }
    }
};

module.exports = {
    Mensaje,
    MensajeSchema,
    MENSAJE_TABLE
}