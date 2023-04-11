require('dotenv').config();
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const fileUpload = require('../middlewares/fileUpload.middleware');
const { registrarBlog, listarBlogs, actualizarBlog, eliminarBlog, buscarBlog } = require('../services/blog.service');
const { registrarBlogSchema, actualizarBlogSchema } = require('../schemas/blog.schema');
const validatorHandlerFormData = require('../helpers/validatorFormulario');
const aws = require('aws-sdk');
const { getName } = require('../helpers/getNameFromUrl');

const router = express.Router();
const s3 = new aws.S3();

router.post('/',
  passport.authenticate('jwt', {session: false}),
  fileUpload.single('foto_blog'),
  async (req, res, next) => {
    try {
      let objFormToJson = JSON.stringify(req.body);
      objFormToJson = JSON.parse(objFormToJson);

      if (objFormToJson.categoriaId) {
        objFormToJson.categoriaId = parseInt(objFormToJson.categoriaId);
      }

      const file = req.file?.location;
      const fileName = getName(file);

      objFormToJson.imagen = fileName;
      objFormToJson.urlImagen = file;

      const resultadoValidacion = validatorHandlerFormData(registrarBlogSchema, objFormToJson);

      if (resultadoValidacion === true) {
        const formulario = await registrarBlog(objFormToJson);
        res.status(201).json(formulario);
      } else {
        await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }).promise();
        throw boom.badRequest(resultadoValidacion);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get('/',
  async (req, res, next) => {
    try {
      const blogs = await listarBlogs(req?.query);
      res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id',
  passport.authenticate('jwt', {session: false}),
  fileUpload.single('foto_blog'),
  async (req, res, next) => {
    try {
      let objFormToJson = JSON.stringify(req.body);
      objFormToJson = JSON.parse(objFormToJson);

      if (objFormToJson.categoriaId) {
        objFormToJson.categoriaId = parseInt(objFormToJson.categoriaId);
      }

      const file = req.file?.location || 'empty';
      const fileName = getName(file) || 'empty';

      objFormToJson.imagen = fileName;
      objFormToJson.urlImagen = file;

      const resultadoValidacion = validatorHandlerFormData(actualizarBlogSchema, objFormToJson);

      if (resultadoValidacion === true) {
        const { id } = req.params;
        const respuesta = await actualizarBlog(id, objFormToJson);
        res.status(201).json(respuesta);
      } else {
        if (file !== 'empty') {
          await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }).promise();
        }
        throw boom.badRequest(resultadoValidacion);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const respuesta = await eliminarBlog(id);
      res.status(201).json(respuesta);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;