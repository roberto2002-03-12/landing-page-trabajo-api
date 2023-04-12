const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const registrarCategoria = async (obj) => {
  const categoria = await models.Categoria.create(obj);

  return categoria;
};

const actualizarCategoria = async (id, obj) => {
  const categoria = await models.Categoria.findByPk(id);

  if (!categoria) throw boom.notFound('No puedes actualizar algo que no existe');

  await categoria.update(obj);

  return 'Categoria actualizada correctamente';
};

const listarCategoria = async () => {
  const categorias = await models.Categoria.findAll();
  const cantidad = await models.Categoria.count();

  return {
    categorias,
    cantidad
  };
};

const eliminarCategoria = async (id) => {
  const categoria = await models.Categoria.findByPk(id);

  if (!categoria) throw boom.notFound('No puedes eliminar algo que no existe');

  await categoria.destroy();

  return 'Categoria eliminada';
};

module.exports = {
  registrarCategoria,
  actualizarCategoria,
  listarCategoria,
  eliminarCategoria
};