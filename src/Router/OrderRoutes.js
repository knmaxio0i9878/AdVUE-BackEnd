const orderController = require("../Controller/OrderController")
const router = require("express").Router()

router.post("/addorder",orderController.addOrder)
router.get("/getallorders",orderController.getAllOrders)
router.get("/singleorder/:id",orderController.getSingleOrder)

module.exports = router