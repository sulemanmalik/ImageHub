const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Image = require("../../models/Image");
const mongoose = require("mongoose");

//GET all orders
router.get("/", async (req, res, next) => {
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
});

//POST a new order
router.post("/", async (req, res, next) => {
  try {
    const existingImage = await Image.findById({ _id: req.body.imageId });

    if (existingImage) {
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        image: req.body.imageId
      });

      const result = await order.save();

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
});

router.get("/:orderId", async (req, res, next) => {
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
});

//FIX - can delete order for non exitent order id
router.delete("/:orderId", async (req, res, next) => {
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
});

module.exports = router;
