const express = require("express");
const router = express.Router();

//controller
const OrdersController = require('../controllers/ordersController')


router.get("/", OrdersController.getAllOrders);

router.post("/", OrdersController.createOrder);

router.get("/:orderId", OrdersController.getSingleOrder);

router.delete("/:orderId", OrdersController.deleteSingleOrder);

module.exports = router;
