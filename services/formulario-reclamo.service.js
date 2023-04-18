const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Sequelize, Op } = require('sequelize');
const axios = require('axios').default;
const { config } = require('../config/config');

const subirFormulario = async (obj) => {
    const respuesta = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${config.googleCaptchaKey}&response=${obj.captchaToken}`
    )
    
    if (respuesta.data.success == false) throw boom.badRequest('Por favor verifique que es humano');

    delete obj.captchaToken;

    const formulario = await models.FormularioReclamo.create(obj);

    return formulario;
};

const listarFormularios = async (query) => {
    const { nombre_completo, fecha_creada, limit, offset,
            tipo_persona, tipo_reclamo, tipo_contratado } = query || {};

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
        };
    };

    if (fecha_creada) {
        opciones.where = Sequelize.and(opciones.where,
            Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('created_at')),
                fecha_creada
            )
        );
    };

    if (tipo_persona) {
        opciones.where = Sequelize.and(
            opciones.where, { tipoPersona: tipo_persona }
        );
    };

    if (tipo_reclamo) {
        opciones.where = Sequelize.and(
            opciones.where, { tipoReclamo: tipo_reclamo }
        );
    };

    if (tipo_contratado) {
        opciones.where = Sequelize.and(
            opciones.where, { bienContratado: tipo_contratado }
        );
    };

    if (limit) opciones.limit = parseInt(limit);
    if (offset) opciones.offset = parseInt(offset);

    const formularios = await models.FormularioReclamo.findAll(opciones);
    const cantidad = await models.FormularioReclamo.count({
        where: opciones.where
    });
    
    return {
        formularios,
        cantidad
    };
};

const seleccionarFormulario = async (id) => {
    const formulario = await models.FormularioReclamo.findByPk(id);

    if (!formulario) throw boom.notFound('No se encontró el formulario');

    return formulario;
};

module.exports = {
    subirFormulario,
    listarFormularios,
    seleccionarFormulario
};