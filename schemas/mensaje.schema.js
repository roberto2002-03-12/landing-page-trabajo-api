const Joi = require('joi');

const id = Joi.number().integer();
const nombreCompleto = Joi.string().max(95);
const numeroCelular = Joi.number().max(999999999);
const mensaje = Joi.string().max(150);
const captchaToken = Joi.string();

//queries
const fecha_creada = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const limit = Joi.number().max(20);
const offset = Joi.number();

const crearMensajeSchema = Joi.object({
    nombreCompleto: nombreCompleto.required(),
    numeroCelular: numeroCelular.required(),
    mensaje: mensaje.optional(),
    captchaToken: captchaToken.required()
});

const listarMensajesSchema = Joi.object({
    nombre_completo: nombreCompleto.optional(),
    fecha_creada: fecha_creada.optional(),
    limit: limit.optional(),
    offset: offset.optional()
});

const seleccionarMensajeSchema = Joi.object({
    id: id.required()
});

module.exports = {
    crearMensajeSchema,
    listarMensajesSchema,
    seleccionarMensajeSchema
}