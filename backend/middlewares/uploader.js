const multer = require("multer");
const path = require("path");

const fileName = (req, file, cb) =>{
    // let lastIndexOf = file.originalName.lastIndexOf(".");
    // let ext = file.originalName.substring(lastIndexOf);
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
}

const destination = (req, file, cb) =>{
    const dirname = path.join(__dirname, "../src/uploads");
    console.log(file, dirname)
    cb(null, dirname);
}

const upload = multer({
    storage: multer.diskStorage({
        destination,
        filename: fileName
    })
})

module.exports = upload;