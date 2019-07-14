const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//controller
const OrdersController = require('../controllers/ordersController')


router.get("/", OrdersController.getAllOrders);

router.post("/", auth, OrdersController.createOrder);

router.get("/:orderId", OrdersController.getSingleOrder);

router.delete("/:orderId", OrdersController.deleteSingleOrder);

module.exports = router;
