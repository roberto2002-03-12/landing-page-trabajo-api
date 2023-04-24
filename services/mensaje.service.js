const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Sequelize, Op } = require('sequelize');
const { config } = require('../config/config');
const axios = require('axios').default;

const listarMensajes = async (query) => {
    const { nombre_completo, fecha_creada, limit, offset } = query || {};

    const opciones = {
        where: {},
        limit: 20,
        offset: 0,
        order: [['createdAt', 'DESC']]
    };

    if (nombre_completo) {
        opciones.where = {
            nombreCompleto: {
                [Op.like]: '%' + nombre_completo + '%'
            }
        }
    };

    if (fecha_creada) {
        /*
        //este muestra a partir de una fecha para arriba
        opciones.where = Sequelize.and(opciones.where, {
            createdAt: {
                [Op.gte]: fecha_creada
            }
        });
        */
        //este solo muestra los de esa fecha, sin embargo, no los demás.
        opciones.where = Sequelize.and(opciones.where, 
            Sequelize.where(
                //Sequelize.fn crea una nueva columna temporal, donde esta "DATE" le definimos que tipo va ser
                //en este caso va transformar de DATETIME a DATE
                Sequelize.fn('DATE', Sequelize.col('created_at')),
                //buscar que sea igual a la fecha 
                fecha_creada
            )
        );
    };

    if (limit) opciones.limit = parseInt(limit);
    if (offset) opciones.offset = parseInt(offset);

    const mensajes = await models.Mensaje.findAll(opciones);
    const cantidad = await models.Mensaje.count({
        where: opciones.where
    });

    return {
        mensajes,
        cantidad
    };
};

const crearMensaje = async (obj) => {
    const respuesta = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${config.googleCaptchaKey}&response=${obj.captchaToken}`
    );

    if (respuesta.data.success == false) throw boom.badRequest('Por favor verifique que es humano');

    delete obj.captchaToken;

    const mensaje = models.Mensaje.create(obj);

    return mensaje;
};

const seleccionarMensaje = async (id) => {
    const mensaje = models.Mensaje.findByPk(id);

    if (!mensaje) throw boom.notFound('No se encontró el mensaje');

    return mensaje;
};

module.exports = {
    listarMensajes,
    crearMensaje,
    seleccionarMensaje,
}