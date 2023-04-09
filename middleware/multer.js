const multer = require('multer');


const storage = multer.diskStorage({

  destination: function(req, file, cb){
    cb(null, './public/imagenes');

  },

  filename: function(req, file, cb){
    cb(null, `${Date.now()}-${file.originalname}`);
  }

});

const uploadImage = multer({ storage }).single('foto');

module.exports = {

  uploadImage

};