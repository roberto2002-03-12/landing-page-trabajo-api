const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { listarMensajes, crearMensaje, seleccionarMensaje } = require('../services/mensaje.service');
const { crearMensajeSchema, listarMensajesSchema, seleccionarMensajeSchema } = require('../schemas/mensaje.schema');
const router = express.Router();

router.post('/',
    validatorHandler(crearMensajeSchema, 'body'),
    async (req, res, next) => {
        try {
            const obj = req.body;
            const respuesta = await crearMensaje(obj);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(listarMensajesSchema, 'query'),
    async (req, res, next) => {
        try {
            console.log(req.query);
            const respuesta = await listarMensajes(req?.query);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(seleccionarMensajeSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await seleccionarMensaje(id);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;