const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const { config } = require('../config/config');

const getUserByEmail = async (email) => {
    const user = await models.User.findOne({
        where: { email: email }
    });

    return user;
};

const createUser = async (obj) => {
    const usuario = await getUserByEmail(obj.email);

    if (usuario !== null) throw boom.unauthorized('Email ya registrado');

    if (obj.userClave !== config.keyUser) throw boom.unauthorized('Email ya registrado');

    const hash = await bcrypt.hash(obj.password, 10);

    const usuarioCreado = await models.User.create({
        email: obj.email,
        password: hash
    });

    delete usuarioCreado.dataValues.password;

    return usuarioCreado;
};

const getUserById = async (id) => {
    const user = await models.User.findByPk(id);

    if (!user) throw boom.unauthorized('No valido');

    delete user.dataValues.password;

    return user;
};

const updateUser = async (id, obj) => {
    const user = await models.User.findByPk(id);

    if (!user) throw boom.notFound('No puedes cambiar un email de un usuario inexistente');

    await user.update(obj);

    return 'Datos cambiados';
};

const changePasswordAuth = async (id, contrasena) => {
    const user = await models.User.findByPk(id);

    if (!user) throw boom.notFound('No puedes cambiar un email de un usuario inexistente');
    console.log(contrasena);
    const hash = await bcrypt.hash(contrasena, 10);

    await user.update({
        password: hash
    });

    return 'Contraseña cambiada';
};

module.exports = {
    getUserByEmail,
    getUserById,
    updateUser,
    changePasswordAuth,
    createUser
};