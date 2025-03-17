const router = require("express").Router()
const customizationController = require("../Controller/CustomController")


router.post("/addcustom",customizationController.insertProduct)
router.get("/getcustom",customizationController.getAllCustom)
router.get("/getsinglecustom/:id",customizationController.getSingleOrder)
router.post("/confirmordercustom",customizationController.updateCustomEmail)




module.exports = router