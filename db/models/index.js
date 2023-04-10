const { Mensaje, MensajeSchema } = require('./mensaje.model');
const { User, UserSchema } = require('./user.model');
const { Blog, BlogSchema } = require('./blog.model');
const { Categoria, CategoriaSchema } = require('../models/categoria.model');
const { FormularioReclamo, FormularioReclamoSchema } = require('./formulario-reclamo.model');

function setupModels(sequelize) {
    Mensaje.init(MensajeSchema, Mensaje.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    FormularioReclamo.init(FormularioReclamoSchema, FormularioReclamo.config(sequelize));
    Categoria.init(CategoriaSchema, Categoria.config(sequelize));
    Blog.init(BlogSchema, Blog.config(sequelize));

    Mensaje.associate(sequelize.models);
    User.associate(sequelize.models);
    FormularioReclamo.associate(sequelize.models);
    Categoria.associate(sequelize.models);
    Blog.associate(sequelize.models);
};

module.exports = setupModels;