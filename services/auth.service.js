const { getUserById, getUserByEmail, updateUser } = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

const getUser = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) throw boom.unauthorized('No hay autenticación');

    const comprobar = await bcrypt.compare(password, user.password);

    if (!comprobar) throw boom.unauthorized('Contraseña incorrecta');

    delete user.dataValues.password;

    return user;
};

const signToken = async (user) => {
    const payload = {
        sub: user.iduser
    };

    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '2h'});

    return {
        user,
        token
    };
};

const sendMail = async (infoMail) => {
    //transporte para enviar mails
    const transporte = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: config.emailRecype,
            pass: config.passRecype
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    //enviar email con las opciones establecidas
    //en esas opciones esta el usuario y otras cosas
    await transporte.sendMail(infoMail);

    return { message: 'Email enviado' };
};

const sendRecovery = async (email) => {
    const user = await getUserByEmail(email);

    if (!user) throw boom.unauthorized('No hay autenticación');
    
    const payload = {
        sub: user.iduser
    };
    //nuevo token con firma autentica y con tiempo de expiración de 15 min
    //esta pensado solamente en cambiar contraseña
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});

    /*voy a guardar este token en la base de datos para luego
    cuando sea el momento de cambiar contraseña buscar este token
    y si existe entonces permitir al usuario en cambiar su contraseña*/
    const recovery = {
        recoveryToken: token
    };

    await updateUser(user.iduser, recovery);

    const emailInfo = {
        from: config.emailRecype, //el correo con la cual se va enviar
        to: `${user.email}`, //el correo donde se le va enviar
        subject: 'Email para recuperar la contraseña', //titulo de mensaje
        text: `este es el token para recuperar la contraseña: ${token}`, //texto de mensaje
        //html: `<b>Ingresa a este link para recuperar la contraseña => ${link}</b>` //diseño html si se desea
    };

    const respuesta = await sendMail(emailInfo); 
    return respuesta;
};

const changePassword = async (token, nuevaContrasena) => {
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        const user = await getUserById(payload.sub);
        
        if (user.recoveryToken !== token) throw boom.unauthorized('Token invalido, tiempo expirado');

        const hash = await bcrypt.hash(nuevaContrasena, 10);
        
        await updateUser(user.iduser, {
            recoveryToken: null,
            password: hash
        });

        return { message: 'Contraseña cambiada' };
    } catch(err) {
        throw boom.unauthorized('Tiempo expirado');
    }
};

module.exports = {
    getUser,
    signToken,
    sendMail,
    sendRecovery,
    changePassword
};