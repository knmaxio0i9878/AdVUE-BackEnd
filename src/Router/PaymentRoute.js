const router = require("express").Router()
const paymentController = require("../Controller/PaymentController")

router.post("/createorder",paymentController.creatOrder)
router.post("/verifyorder",paymentController.verifyOrder)

module.exports = router
    