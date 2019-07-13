const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//mongoose models
const Image = require("../../models/Image");

//GET all images
router.get("/", async (req, res, next) => {
  try {
    const images = await Image.find().select('title price _id');
    const response = {  
        images: images.map(i => {
            return {
                ...i._doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/' + i.id
                }
            }
        }),
        count: images.length,

    }
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

//POST a new image to the server
router.post("/", async (req, res, next) => {
  const image = Image({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price
  });

  try {
    const result = await image.save();
    console.log(result);
    res.status(201).json({
      messsage: "Image uploaded successfully!",
      createdImage: {
          ...image._doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/' + result.id
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
    const image = await Image.findById(id);
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

//PATCH the properties of an image by its id
router.patch("/:imageId", async (req, res, next) => {
  try {
    const updateFields = {};
    for (const field of req.body) {
      updateFields[field.property] = field.value;
    }
    await Image.update(
      {
        _id: req.params.imageId
      },
      { $set: updateFields}
    )

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

//DELETE an image by its id
router.delete("/:imageId", async (req, res, next) => {
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
