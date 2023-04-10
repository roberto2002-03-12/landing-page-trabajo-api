const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { createUser, changePasswordAuth, updateUser } = require('../services/user.service');
const { registrarUsuarioSchema, cambiarContrasenaAuthSchema, 
        cambiarContrasenaNoAuthSchema, cambiarEmailSchema, loginUsuarioSchema } = require('../schemas/user.schema');
const { signToken, sendRecovery, changePassword } = require('../services/auth.service');

const router = express.Router();

router.post('/registrarse',
    validatorHandler(registrarUsuarioSchema, 'body'),
    async (req, res, next) => {
        try {
            const obj = req.body;
            const newUser = await createUser(obj);
            res.status(201).json(newUser);
        } catch(err) {
            next(err);
        };
    }
);

router.post('/login',
    passport.authenticate('local', {session: false}),
    validatorHandler(loginUsuarioSchema, 'body'),
    async (req, res, next) => {
        try {
            const user = req.user;
            const respuesta = await signToken(user);
            res.json(respuesta);
        } catch (err) {
            next(err);
        };
    }
);

router.post('/recuperacion-contrasena', async (req, res, next) => {
    try {
        const { email } = req.body;
        const respuesta = await sendRecovery(email);
        res.status(200).json(respuesta);
    } catch (err) {
        next(err);
    }
});

router.post('/cambiar-contrasena',
    validatorHandler(cambiarContrasenaNoAuthSchema, 'body'),
    async (req, res, next) => {
        try {
            const { token, password } = req.body;
            const respuesta = await changePassword(token, password);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/cambiar-contrasena-auth',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(cambiarContrasenaAuthSchema, 'body'),
    async (req, res, next) => {
        try {
            const { sub } = req.user;
            const { password } = req.body;
            const respuesta = await changePasswordAuth(sub, password);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/cambiar-email',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(cambiarEmailSchema, 'body'),
    async (req, res, next) => {
        try {
            const { sub } = req.user;
            const email = req.body;
            const respuesta = await updateUser(sub, email);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;