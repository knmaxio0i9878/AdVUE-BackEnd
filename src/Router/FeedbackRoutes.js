const router = require("express").Router()
const feedbackController = require("../Controller/FeedbackController")

router.post("/insertfeedback",feedbackController.insertFeedback)
router.get("/getfeedback",feedbackController.getFeedback)

module.exports = router