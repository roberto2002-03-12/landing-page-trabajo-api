const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIA_TABLE = 'categoria';

const CategoriaSchema = {
    idcategoria: {
        field: 'id_categoria',
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
};

class Categoria extends Model {
    static associate(models) {
        this.hasMany(models.Blog, {
            as: 'blogs',
            foreignKey: 'categoriaId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORIA_TABLE,
            modelName: 'Categoria',
            timestamps: false,
        }
    };
};

module.exports = {
    Categoria,
    CategoriaSchema,
    CATEGORIA_TABLE    
}