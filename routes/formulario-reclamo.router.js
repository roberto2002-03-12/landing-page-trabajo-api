require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { subirFormulario, listarFormularios, seleccionarFormulario } = require('../services/formulario-reclamo.service');
const validatorHandler = require('../middlewares/validator.handler');
const fileUpload = require('../middlewares/fileUpload.middleware');
const boom = require('@hapi/boom');
const validatorFormulario = require('../helpers/validatorFormulario');
const aws = require('aws-sdk');
const { subirFormularioSchema, listarFormularioSchema, seleccionarFormularioSchema } = require('../schemas/formulario-reclamo.schema');
const { getName } = require('../helpers/getNameFromUrl');

const router = express.Router();
const s3 = new aws.S3();

router.post('/',
    fileUpload.single('archivo_pdf'),
    async (req, res, next) => {
        try {
            let objFormToJson = JSON.stringify(req.body);
            objFormToJson = JSON.parse(objFormToJson);
            objFormToJson.nroDocumento = parseInt(objFormToJson.nroDocumento);
            objFormToJson.telefono = parseInt(objFormToJson.telefono);
            objFormToJson.autorizoActo = parseInt(objFormToJson.autorizoActo);

            //imagen
            const file = req.file?.location;
            const fileName = getName(file);
            
            objFormToJson.documentoNombre = fileName;
            objFormToJson.documentoLink = file;

            const resultadoValidacion = validatorFormulario(subirFormularioSchema, objFormToJson);

            if (resultadoValidacion === true) {
                const formulario = await subirFormulario(objFormToJson);
                res.status(201).json(formulario);
            } else {
                await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }).promise();
                throw boom.badRequest(resultadoValidacion);
            }
        } catch(err) {
            next(err);
        }
    }
);

router.get('/',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(listarFormularioSchema, 'query'),
    async (req, res, next) => {
        try {
            const listaDeFormularios = await listarFormularios(req?.query);
            res.status(200).json(listaDeFormularios);
        } catch(err) {
            next(err);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(seleccionarFormularioSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const formulario = await seleccionarFormulario(id);
            res.status(200).json(formulario); 
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;