require('dotenv').config();
const boom = require('@hapi/boom');
const { Categoria } = require('../db/models/categoria.model');
const { models } = require('../libs/sequelize');
const { Sequelize, Op } = require('sequelize');
const aws = require('aws-sdk');

const s3= new aws.S3();

const registrarBlog = async (obj) => {
    const blog = await models.Blog.create(obj);

    return blog;
};

const listarBlogs = async (query) => {
    const { titulo_blog, categoria_blog, limit, offset } = query || {};

    const opciones = {
        where: {},
        limit: 20,
        offset: 0,
        include: [{
            model: Categoria,
            as: 'categoria',
        }]
    };

    if (titulo_blog) {
        opciones.where = {
            titulo: {
                [Op.like]: '%' + titulo_blog + '%'
            }
        };
    };

    if (categoria_blog) {
        opciones.where = Sequelize.and(
            opciones.where, { categoriaId: categoria_blog }
        );
    };

    if (limit) opciones.limit = parseInt(limit);
    if (offset) opciones.offset = parseInt(offset);

    const blogs = await models.Blog.findAll(opciones);
    const cantidad = await models.Blog.count({
        where: opciones.where
    });

    return {
        blogs,
        cantidad
    };
};

const actualizarBlog = async (id, obj) => {
    const blog = await models.Blog.findByPk(id);

    if (!blog) throw boom.notFound('No puedes cambiar algo que no existe');

    if (obj.urlImagen !== 'empty') {
        await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: blog.dataValues.imagen }).promise();
    } else {
        delete obj.urlImagen;
        delete obj.imagen;
    }

    await blog.update(obj);

    return 'Actualizado correctamente';
};

const eliminarBlog = async (id) => {
    const blog = await models.Blog.findByPk(id);

    if (!blog) throw boom.notFound('No puedes eliminar algo que no existe');

    const fileName = blog.dataValues.imagen;

    await s3.deleteObject({Bucket: process.env.AWS_BUCKET_NAME, Key: fileName}).promise();

    await blog.destroy();

    return 'Eliminado correctamente';
};

const buscarBlog = async (id) => {
    const blog = await models.Blog.findByPk(id, { 
        include: [{
            model: Categoria,
            as: 'categoria',
        }]
    });

    if (!blog) throw boom.notFound('No se encontro el blog');

    return blog;
};

module.exports = {
    registrarBlog,
    listarBlogs,
    actualizarBlog,
    eliminarBlog,
    buscarBlog
};