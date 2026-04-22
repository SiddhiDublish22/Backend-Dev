const multer = require("multer");

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(null, false);
    }
    cb(null, true);
  }
});

module.exports = upload;