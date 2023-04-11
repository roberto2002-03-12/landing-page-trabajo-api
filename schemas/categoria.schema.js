const Joi = require('joi');

const nombre = Joi.string();

const registrarCategoriaSchema = Joi.object({
    nombre: nombre.required(),
});

module.exports = {
    registrarCategoriaSchema,
};