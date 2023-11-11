var multer = require("multer");

function subirArchivo() {
  var storage = multer.diskStorage({
    destination: "./web/videos",
    filename: function (req, file, cb) {
      var archivo = file.originalname;
      cb(null, archivo);
    },
  });
  var upload = multer({ storage }).single("video");
  return upload;
}

module.exports = subirArchivo;
