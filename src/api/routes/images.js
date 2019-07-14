const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//controllers
const ImagesController = require("../controllers/imagesController");

//data storage
const MulterStorage = require('../data/storage')


router.get("/", ImagesController.getAllImages);

router.post("/", MulterStorage.upload.single("imageURL"), ImagesController.uploadImage);

router.get("/:imageId", ImagesController.getSingleImage);

router.patch("/:imageId", auth, ImagesController.editSingleImage);

// router.patch("/:imageId", ImagesController.applyDiscount);

router.delete("/:imageId", ImagesController.deleteSingleImage);

module.exports = router;
