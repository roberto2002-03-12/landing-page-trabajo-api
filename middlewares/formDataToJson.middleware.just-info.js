const boom = require('@hapi/boom');

const formDataToJsonMiddleware = (req, res, next) => {
    try {
        console.log('este es body: ', req.body);
        //const json = JSON.parse(req.body.data);
        //console.log('Este es json: ', json);
        //req.body = json;
        next();
    } catch (error) {
        next(boom.badRequest('Invalid form-data'));
    }
};

module.exports = formDataToJsonMiddleware;