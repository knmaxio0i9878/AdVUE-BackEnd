const router = require("express").Router()
const advantageController = require("../Controller/AdvantageAdvue")

router.get("/getadvantage",advantageController.getAdvantage)
router.post("/insertadvantage",advantageController.insertAdvantage)

module.exports = router