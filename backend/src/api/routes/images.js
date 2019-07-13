const express = require("express");
const router = express.Router();

//route, handler
router.get('/', (req, res, next) => {
    res.status(200).json({
        messsage: "GET from images"
    })
})

router.post('/', (req, res, next) => {
    const image = {
        type: req.body.type,
        price: req.body.price
    }
    res.status(201).json({
        messsage: "Handling POST to /images",
        createdImage: image
    })
})

router.get('/:imageId', (req, res, next) => {
    //extract the image id
    const id = req.params.imageId
    if(id === 'special') {
        res.status(200).json({
            messsage: 'special id',
            id: id
        })
    } else {
        res.status(200).json({
            messsage: 'passed id'
        })
    }
})

router.patch('/:imageId', (req, res, next) => {
    res.status(200).json({
        messsage: "updated image"
    })
})

router.delete('/:imageId', (req, res, next) => {
    res.status(200).json({
        messsage: "deleted image"
    })
})

module.exports = router