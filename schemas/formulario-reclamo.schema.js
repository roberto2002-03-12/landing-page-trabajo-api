const Joi = require('joi');

const id = Joi.number();
const nombreCompleto = Joi.string().max(95);
const tipoPersona = Joi.string().max(20);
const razonSocial = Joi.string().max(45);
const domicilio = Joi.string().max(65);
const departamento = Joi.string().max(45);
const provincia = Joi.string().max(45);
const distrito = Joi.string().max(45);
const docIdentidad = Joi.string().max(45);
const nroDocumento = Joi.number();
const telefono = Joi.number().max(999999999);
const email = Joi.string().email().max(95);
const tipoReclamo = Joi.string().max(10);
const bienContratado = Joi.string().max(120);
const documentoNombre = Joi.string();
const documentoLink = Joi.string();
const detalleDelProducto = Joi.string().max(250);
const detalleDelReclamo = Joi.string().max(250);
const autorizoActo = Joi.number().max(1);

//queries
const createdAt = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const limit = Joi.number().max(20);
const offset = Joi.number();

const subirFormularioSchema = Joi.object({
    nombreCompleto: nombreCompleto.required(),
    tipoPersona: tipoPersona.required(),
    razonSocial: razonSocial.required(),
    domicilio: domicilio.required(),
    departamento: departamento.required(),
    provincia: provincia.required(),
    distrito: distrito.required(),
    docIdentidad: docIdentidad.required(),
    nroDocumento: nroDocumento.required(),
    telefono: telefono.required(),
    email: email.required(),
    tipoReclamo: tipoReclamo.required(),
    bienContratado: bienContratado.required(),
    documentoNombre: documentoNombre.required(),
    documentoLink: documentoLink.required(),
    detalleDelProducto: detalleDelProducto.required(),
    detalleDelReclamo: detalleDelReclamo.required(),
    autorizoActo: autorizoActo.required(),
});

const listarFormularioSchema = Joi.object({
    nombre_completo: nombreCompleto.optional(),
    fecha_creada: createdAt.optional(),
    limit: limit.optional(),
    offset: offset.optional(),
    tipo_persona: tipoPersona.optional(),
    tipo_reclamo: tipoReclamo.optional(),
    tipo_contratado: bienContratado.optional()
});

const seleccionarFormularioSchema = Joi.object({
    id: id.required()
});

module.exports = {
    subirFormularioSchema,
    listarFormularioSchema,
    seleccionarFormularioSchema
};