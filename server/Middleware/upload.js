const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //.jpg .png
        const fileExtension = path.extname(file.originalname);
        callback(null, `${uniqueSuffix}${fileExtension}`);
    }
})

exports.upload = multer({ storage: storage }).single('file')