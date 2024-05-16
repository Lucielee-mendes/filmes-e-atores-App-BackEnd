// config.js

const multer = require('multer');
 
module.exports = {
  upload() {
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          // Gere um nome de arquivo único usando o timestamp atual
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
        }
      })
    };
  }
};
