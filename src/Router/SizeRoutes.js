const { Router } = require("express")
const sizecontroller = require("../Controller/SizeController")
const router = require("express").Router()

router.post("/sizeadd",sizecontroller.insertsizes)
router.get("/getsize",sizecontroller.getSize)

module.exports = router