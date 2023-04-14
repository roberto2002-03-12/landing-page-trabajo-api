const Joi = require('joi');

const titulo = Joi.string().min(6).max(45);
const descripcion = Joi.string().min(100).max(1000);
const imagen = Joi.string();
const urlImagen = Joi.string();
const urlBlog = Joi.string();
const categoriaId = Joi.number();

const registrarBlogSchema = Joi.object({
    titulo: titulo.required(),
    descripcion: descripcion.required(),
    imagen: imagen.required(),
    urlImagen: urlImagen.required(),
    urlBlog: urlBlog.required(),
    categoriaId: categoriaId.optional()
});

const actualizarBlogSchema = Joi.object({
    titulo: titulo.optional(),
    descripcion: descripcion.optional(),
    imagen: imagen.optional(),
    urlImagen: urlImagen.optional(),
    urlBlog: urlBlog.optional(),
    categoriaId: categoriaId.optional()
});

module.exports = {
    registrarBlogSchema,
    actualizarBlogSchema
};