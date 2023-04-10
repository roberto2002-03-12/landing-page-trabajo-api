const Joi = require('joi');

const idblog = Joi.number();
const titulo = Joi.string().max(45);
const descripcion = Joi.string().min(100).max(1000);
const imagen = Joi.string();
const urlImagen = Joi.string();
const urlBlog = Joi.string();
const categoriaId = Joi.number();

const registrarBlog = Joi.object({
    titulo: titulo.required(),
    descripcion: descripcion.required(),
    imagen: imagen.required(),
    urlImagen: urlImagen.required(),
    urlBlog: urlBlog.required(),
    categoriaId: categoriaId.optional()
});

module.exports = {
    registrarBlog
}