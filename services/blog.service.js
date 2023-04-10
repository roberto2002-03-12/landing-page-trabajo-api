const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Sequelize, Op } = require('sequelize');

const registrarBlog = async (blog) => {
    const blog = await models.Blog.create(blog);

    return blog;
};

const listarBlogs = async (query) => {
    const {  } = query || {};

    const opciones = {
        where: {},
        limit: 20,
        offset: 0
    };

    const blogs = await models.Blog.findAll();
    const cantidad = await models.Blog.count();

    return {
        blogs,
        cantidad
    };
};

const actualizarBlog = async (id, obj) => {
    const blog = await models.Blog.findByPk(id);

    if (!blog) throw boom.notFound('No puedes cambiar algo que no existe');

    await blog.update(obj);

    return 'Actualizado correctamente';
};

const eliminarBlog = async (id) => {
    const blog = await models.Blog.findByPk(id);

    if (!blog) throw boom.notFound('No puedes eliminar algo que no existe');

    await blog.destroy();

    return 'Eliminado correctamente';
};

const buscarBlog = async (id) => {
    const blog = await models.Blog.findByPk(id);

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