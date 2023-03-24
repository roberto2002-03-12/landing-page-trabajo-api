const express = require('express');
const mensajeRouter = require('./mensaje.router');
const userRouter = require('./user.router');
const formularioRouter = require('./formulario-reclamo.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/landing-dyf/v1', router);

    router.use('/mensajes', mensajeRouter);
    router.use('/auth', userRouter);
    router.use('/formulario-reclamo', formularioRouter);
};

module.exports = routerApi;