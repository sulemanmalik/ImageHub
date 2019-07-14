const express = require("express");
const router = express.Router();

const ChargesController = require('../controllers/chargesController')

router.post("/charge", ChargesController.chargeHandler);

module.exports = router;
