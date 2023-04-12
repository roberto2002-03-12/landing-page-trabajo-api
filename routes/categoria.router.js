const express = require('express');
const { registrarCategoria, listarCategoria, actualizarCategoria, eliminarCategoria } = require('../services/categoria.service');
const { registrarCategoriaSchema, actualizarCategoriaSchema } = require('../schemas/categoria.schema');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(registrarCategoriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const categoria = await registrarCategoria(body);
      res.status(201).json(categoria);
    } catch(err) {
      next(err);
    }
  }
);

router.get('/',
  async (req, res, next) => {
    try {
      const listaCat = await listarCategoria();
      res.status(200).json(listaCat);
    } catch (err) {
      next(err)
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(registrarCategoriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const respuesta = await actualizarCategoria(id, body);
      res.status(201).json(respuesta);
    } catch(err) {
      next(err);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const respuesta = await eliminarCategoria(id);
      res.status(201).json(respuesta);
    } catch(err) {
      next(err);
    }
  }
);

module.exports = router;