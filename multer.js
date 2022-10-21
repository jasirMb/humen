const multer = require('multer')




// multer.............................
const storage = multer.diskStorage({
    destination: function (req, file, callback) { 
        callback(null, './public/productImages')
    },
    // name........................
    filename: function (req, file, cb) {
        const unique = Date.now() + '.jpg'
        cb(null, unique)
    }
});

module.exports =  upload = multer({ storage: storage })