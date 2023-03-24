const { Strategy } = require('passport-local');
const { getUser } = require('../../../services/auth.service');

/*LocalStrategy se utiliza para definir un metodo de autenticación de manera
local, y así no utilizar otros métodos no locales como estrategia de Google u otra opción*/

const LocalStrategy = new Strategy({
        usernameField: 'email', //espera recibir el valor en el campo "email"
        passwordField: 'password' //espera recibir el valor en el campo "password"
    },
    async (email, password, done) => {
        try {
            const user = await getUser(email, password);
            done(null, user);
        } catch(err) {
            done(err, false);
        };
    }
);

module.exports = LocalStrategy;