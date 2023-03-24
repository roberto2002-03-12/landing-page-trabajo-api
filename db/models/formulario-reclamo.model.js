const { Model, DataTypes, Sequelize } = require('sequelize');

const FORMULARIO_RECLAMO_TABLE = 'formulario_reclamo';
//defaultValue
const FormularioReclamoSchema = {
    idformulario: {
        field: 'id_formulario_reclamo',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombreCompleto: {
        field: 'nombre_completo',
        type: DataTypes.STRING(95),
        allowNull: false
    },
    tipoPersona: {
        field: 'tipo_persona',
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    razonSocial: {
        field: 'razon_social',
        type: DataTypes.STRING(45),
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    provincia: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    distrito: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    docIdentidad: {
        field: 'doc_identidad',
        type: DataTypes.STRING(45),
        allowNull: false
    },
    nroDocumento: {
        field: 'nro_documento',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(95),
        allowNull: false
    },
    tipoReclamo: {
        field: 'tipo_reclamo',
        type: DataTypes.STRING(10),
        allowNull: false
    },
    bienContratado: {
        field: 'bien_contratado',
        type: DataTypes.STRING(120),
        allowNull: false,
    },
    documentoNombre: {
        field: 'documento_nombre',
        type: DataTypes.STRING,
        allowNull: false
    },
    documentoLink: {
        field: 'documento_link',
        type: DataTypes.STRING,
        allowNull: false
    },
    detalleDelProducto: {
        field: 'detalle_producto',
        type: DataTypes.TEXT('medium'),
        allowNull: false
    },
    detalleDelReclamo: {
        field: 'detalle_reclamo',
        type: DataTypes.TEXT('medium'),
        allowNull: false
    },
    autorizoActo: {
        field: 'autoriza_acto',
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
};

class FormularioReclamo extends Model {
    static associate(models) {
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: FORMULARIO_RECLAMO_TABLE,
            modelName: 'FormularioReclamo',
            timestamps: false
        }
    }
};

module.exports = {
    FormularioReclamo,
    FormularioReclamoSchema,
    FORMULARIO_RECLAMO_TABLE
}