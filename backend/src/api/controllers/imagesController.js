const Image = require("../../models/Image");
const User = require("../../models/User");
const mongoose = require("mongoose");

const Helpers = require('../../helpers/drill')

const getAllImages = async (req, res, next) => {
  try {
    const images = await Image.find().populate('user', 'email').select("title price _id imageURL uploadedBy");
    const response = {
      images: images.map(img => {
        return {
          ...img._doc,
          imageURL: img.imageURL,
          // uploadedBy: Helpers.userDrill.bind(this, img._doc.uploadedBy)
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
};

const uploadImage = async (req, res, next) => {
  // if (!req.authenticated) {
  //   res.status(401).json({
  //     message: "Unauthenticated"
  //   });
  // }
  console.log(req.file);

  const image = Image({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price,
    imageURL: req.file.path,
    // uploadedBy: req.body.userId
  });

  // const user = await User.findById(req.body.userId)

  // user.uploadedImages.push(image)
  // await user.save()

  try {
    const result = await image.save();

    console.log(result);

    res.status(201).json({
      messsage: "Image uploaded successfully!",
      createdImage: {
        ...image._doc
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err
    });
    throw new Error("Error");
  }
};

const getSingleImage = async (req, res, next) => {
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
};

const editSingleImage = async (req, res, next) => {
  // if (!req.authenticated) {
  //   res.status(401).json({
  //     message: "Unauthenticated"
  //   });
  // }
  try {
    const imageToEdit = await Image.findById(req.params.imageId).select("title price _id image");

    const updateFields = {};
    for (const field of req.body) {
      updateFields[field.property] = field.value;
    }

    if(updateFields.discount) {
      const discount = 1 - Number(updateFields.discount) * 0.01
      const newPrice = imageToEdit.price * discount
      updateFields.price = newPrice
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
};

const applyDiscount = async (req, res, next) => {
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
      message: "Discount applied successfully!"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
}

const deleteSingleImage = async (req, res, next) => {
  // if (!req.authenticated) {
  //   res.status(401).json({
  //     message: "Unauthenticated"
  //   });
  // }

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
}

module.exports = { getAllImages, uploadImage, getSingleImage, editSingleImage, deleteSingleImage, applyDiscount };
