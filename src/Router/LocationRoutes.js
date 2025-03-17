const locationcontroller = require("../Controller/LocationController")
const router = require("express").Router()

router.post("/addlocation",locationcontroller.addLocation)
router.get("/getlocation",locationcontroller.getLocations)

module.exports = router