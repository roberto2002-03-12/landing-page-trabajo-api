const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string().min(60);
const userClave = Joi.string().max(15); //dyf-pruebas-dev

const registrarUsuarioSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    userClave: userClave.required()
});

const loginUsuarioSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

const cambiarContrasenaNoAuthSchema = Joi.object({
    token: token.required(),
    password: password.required()
});

const cambiarContrasenaAuthSchema = Joi.object({
    password: password.required()
});

const cambiarEmailSchema = Joi.object({
    email: email.required()
});

module.exports = {
    registrarUsuarioSchema,
    cambiarContrasenaNoAuthSchema,
    cambiarContrasenaAuthSchema,
    cambiarEmailSchema,
    loginUsuarioSchema
}