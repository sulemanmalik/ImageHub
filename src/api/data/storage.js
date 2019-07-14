const multer = require("multer");

//storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

//filter image types
const imageFilter = (req, file, callback) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

//specifies a folder where images are uploaded (can add limits for file size)
const upload = multer({
  storage: storage,
  limits: {},
  filter: imageFilter
});

module.exports = { storage, imageFilter, upload}