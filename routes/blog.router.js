require('dotenv').config();
const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');
const fileUpload = require('../middlewares/fileUpload.middleware');
const { registrarBlog, listarBlogs, actualizarBlog,
        eliminarBlog, buscarBlog 
      } = require('../services/blog.service');
const validatorHandlerFormData = require('../helpers/validatorFormulario');
const aws = require('aws-sdk');
const { getName } = require('../helpers/getNameFromUrl');

const router = express.Router();
const s3 = new aws.S3();

router.post('/',
      fileUpload.single('foto_blog'),
      async (req, res, next) => {
        try {
            let objFormToJson = JSON.stringify(req.body);
            objFormToJson = JSON.parse(objFormToJson);
            objFormToJson.categoriaId = parseInt(objFormToJson.categoriaId);

            const file = req.file?.location;
            const fileName = getName(file);

            objFormToJson.imagen = fileName;
            objFormToJson.urlImagen = file;

            //const resultadoValidacion = validatorFormulario(subirFormularioSchema, objFormToJson);

        } catch (err) {
            next(err);
        }
      }
)