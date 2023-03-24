const { Mensaje, MensajeSchema } = require('./mensaje.model');
const { User, UserSchema } = require('./user.model');
const { FormularioReclamo, FormularioReclamoSchema } = require('./formulario-reclamo.model');

function setupModels(sequelize) {
    Mensaje.init(MensajeSchema, Mensaje.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    FormularioReclamo.init(FormularioReclamoSchema, FormularioReclamo.config(sequelize));

    Mensaje.associate(sequelize.models);
    User.associate(sequelize.models);
    FormularioReclamo.associate(sequelize.models);
};

module.exports = setupModels;