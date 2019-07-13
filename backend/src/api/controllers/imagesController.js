const Image = require("../../models/Image");
const mongoose = require("mongoose");

const getAllImages = async (req, res, next) => {
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
};

//PROTECTED 
const uploadImage = async (req, res, next) => {
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
};

module.exports = { getAllImages, uploadImage };
