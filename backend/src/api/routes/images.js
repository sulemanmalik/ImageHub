const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const auth = require("../../middleware/auth");

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
//specifies a folcder where images are uploaded (can add limits for file size)
const upload = multer({
  storage: storage,
  limits: {},
  filter: imageFilter
});

//mongoose models
const Image = require("../../models/Image");

//GET all images
router.get("/", async (req, res, next) => {
  try {
    const images = await Image.find().select("title price _id imageURL");
    const response = {
      images: images.map(img => {
        return {
          ...img._doc,
          imageURL: img.imageURL
        };
      }),
      count: images.length
    };
    console.log(response);
    if (response) {
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

//POST a new image to the server - protected
router.post("/", upload.single("imageURL"), auth, async (req, res, next) => {
  if (!req.authenticated) {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
  console.log(req.file);
  const image = Image({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price,
    imageURL: req.file.path
  });

  try {
    const result = await image.save();
    console.log(result);
    res.status(201).json({
      messsage: "Image uploaded successfully!",
      createdImage: {
        ...image._doc,
        request: {
          type: "GET",
          url: "http://localhost:3000/" + result.id
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
    throw new Error("Error");
  }
});

//GET one image by its id
router.get("/:imageId", async (req, res, next) => {
  const id = req.params.imageId;
  try {
    const image = await Image.findById(id).select("title price _id image");
    if (image._doc) {
      res.status(200).json(image._doc);
    } else {
      res.status(404).json({
        message: "Invalid image id"
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
    throw new Error("Error");
  }
});

//PATCH the properties of an image by its id - protected
router.patch("/:imageId", auth, async (req, res, next) => {
  if (!req.authenticated) {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
  try {
    const updateFields = {};
    for (const field of req.body) {
      updateFields[field.property] = field.value;
    }
    await Image.update(
      {
        _id: req.params.imageId
      },
      { $set: updateFields }
    );

    res.status(200).json({
      message: "Image updated successfully!"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

//DELETE an image by its id - protected
router.delete("/:imageId", auth, async (req, res, next) => {
  if (!req.authenticated) {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }

  try {
    await Image.deleteOne({ _id: req.params.imageId });
    res.status(200).json({
      message: "Image deleted successfully!"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
