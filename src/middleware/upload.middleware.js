const multer = require("multer");

let more = new Date();

const upload = (location) => {
  let storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, location);
    },
    filename: function (req, file, cb) {
      cb(null, more.getTime() + file.originalname);
    },
  });

  return multer({ storage }).single("setAvatar");
};

module.exports = upload;
