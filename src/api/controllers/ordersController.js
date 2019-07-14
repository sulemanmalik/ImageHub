const Order = require("../../models/Order");
const Image = require("../../models/Image");

const mongoose = require("mongoose");

const getAllOrders = async (req, res, next) => {
  try {
    const result = await Order.find()
      .select("image")
      .populate("image", "title price");
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};

const createOrder = async (req, res, next) => {
  if (!req.authenticated) {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
  try {
    const existingImage = await Image.findById({ _id: req.body.imageId });

    if (existingImage) {
      const order = new Order({
        // _id: mongoose.Types.ObjectId(),
        image: req.body.imageId,
        user: req.body.userId
      });

      console.log('request:',req.body)

      const result = await order.save();

      console.log(result)
      res.status(201).json({
        message: "Image order created",
        order: result
      });
    } else {
      throw new Error("Image not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getSingleOrder = async (req, res, next) => {
  try {
    const result = await Order.findById(req.params.orderId)
      .select("image")
      .populate("image", "title price");
    res.status(200).json({
      order: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.deleteOne({ _id: req.params.orderId });
    if (order) {
      res.status(200).json({
        message: "Order deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: "Order does not exist!"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};
module.exports = { getAllOrders, createOrder, getSingleOrder, deleteSingleOrder };
