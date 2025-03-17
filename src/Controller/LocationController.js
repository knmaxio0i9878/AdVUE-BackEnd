const locationModel = require("../Models/LocationModel")

const addLocation = async (req, res) => {

    const locationDetails = {
        area: req.body.area,
        city: req.body.city,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }
    const response = await locationModel.create(locationDetails)
    if (response) {
        res.status(201).json({
            data: response,
            message: "Location Added Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "Failed to Add Location"
        })
    }
}

const getLocations = async (req, res) => {
    const response = await locationModel.find()
    if (response) {
        res.status(201).json({
            data: response,
            message: "Location Get Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "Failed to Get Location"
        })
    }
}



module.exports={
    addLocation,
    getLocations
}