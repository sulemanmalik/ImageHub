const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "images orders fetched"
    })
})

router.post('/', (req, res, next) => {
    const order = {
        imageId: req.body.imageId
    }
    res.status(201).json({
        message: "image order created",
        order: order
    })
})

router.post('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "single image order",
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "order deleted"
    })
})

module.exports = router