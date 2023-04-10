require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

const s3 = new aws.S3();
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('El tipo de archivo no es aceptado'));
        }
    },
    storage: multerS3({
        bucket: process.env.AWS_BUCKET_NAME,
        s3: s3,
        acl: 'public-read',
        key: (req, file, cb) => {
            if (!file) return;
            const fileName = file.fieldname + "-" + Date.now() + "-" + file.originalname;
            const key = fileName.replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
            cb(null, key);
        }
    })
});

module.exports = upload;