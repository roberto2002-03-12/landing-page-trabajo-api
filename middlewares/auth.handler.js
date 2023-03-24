const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkRole(...roles) {
    return (req, res, next) => {
        const user = req.user;
        for (i = 0; i < user.role.length; i++) {
            if (roles.includes(user.role[i])) {
                return next();
            }
        }
        next(boom.unauthorized('No tienes permisos'));
    }
};

module.exports = {
    checkRole
};