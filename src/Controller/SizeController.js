const sizeschema = require("../Models/SizeModel")

const insertsizes = async (req, res) => {
    const size = {
        height: req.body.height,
        width: req.body.width,
        typesize: req.body.typesize,
        total_size: req.body.total_size
    }
    const response = await sizeschema.create(size)
    if (response) {
        res.status(201).json({
            data: response,
            message: "Size inserted successfully",
        })
    }
    else {
        res.status(400).json({
            message: "Failed to insert size"
        })
    }
}


const getSize = async (req, res) => {
    const response = await sizeschema.find()
    if (response) {
        res.status(200).json({
            data: response,
            message: "Size retrieved successfully",
        })
    }
    else {
        res.status(404).json({
            message: "No size found"
        })

    }
}
    module.exports = {
        insertsizes,
        getSize
    }