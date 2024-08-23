const multer =  require('multer')
const path =  require('path')
// const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb){
        const uniqueSuffix = `${Date.now()}-${path.extname(file.originalname)}`;
        cb(null, file.fieldname + "-" + uniqueSuffix)
    }
})

module.exports = multer({storage: storage})