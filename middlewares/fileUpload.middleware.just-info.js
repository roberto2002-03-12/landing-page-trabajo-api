require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: (req, file, cb) => {
            cb(null, 'application/pdf')
        },
        key: (req, file, cb) => {
            if (!file) return;
            const fileName =  Date.now() + "-" + file.originalname;
            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 18 * 1024 * 1024 //max 18 mb 
    }
});
//en JavaScript se puede colocar un middleware dentro del otro
//esto puede ser confuso, pero es como una función dentro de otra
//un middleware viene a ser al final una función con mayor cualidad
const fileUploadMiddleware = (req, res, next) => {
    /*upload.single: es un middleware, entonces en este caso al colocar
    (req, res, (err) => {..}); estamos teniendo acceso poder realizar
    acciones del middleware de upload.single;*/
    upload.single('archivo_pdf')(req, res, (err) => {
        if (err) return next(err);
        req.body.location = req.file.location;
        next();
    });
};

module.exports = fileUploadMiddleware;