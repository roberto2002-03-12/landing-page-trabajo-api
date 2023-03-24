const boom = require('@hapi/boom');

function validatorFormularioHandler(schema, values) {
    const { error } = schema.validate(values, { abortEarly: false });

    if (error) return error;

    return true;
};

module.exports = validatorFormularioHandler;