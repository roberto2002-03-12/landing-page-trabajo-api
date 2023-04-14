const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIA_TABLE } = require('./categoria.model')

const BLOG_TABLE = 'blog';

const BlogSchema = {
    idblog: {
        field: 'id_blog',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(105),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        validate: {
            len: [100, 1000]
        }
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    urlImagen: {
        field: 'url_imagen',
        type: DataTypes.STRING,
        allowNull: false,
    },
    urlBlog: {
        field: 'url_blog',
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriaId: {
        field: 'categoria_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORIA_TABLE,
            key: 'id_categoria'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
};

class Blog extends Model {
    static associate(models) {
        this.belongsTo(models.Categoria, {
            as: 'categoria',
            foreignKey: 'categoriaId'
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: BLOG_TABLE,
            modelName: 'Blog',
            timestamps: false
        }
    };
};

module.exports = {
    Blog,
    BlogSchema,
    BLOG_TABLE
};