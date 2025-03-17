const feedback = require("../Models/FeedbackModel")

const insertFeedback = async (req, res) => {
    const feedbackDetails = {
        order_id: req.body.order_id,
        message: req.body.message,
        feedback_dt: req.body.feedback_dt
    }
    const response = await feedback.create(feedbackDetails)
    if (response) {
        res.status(200).json({
            message: "Feedback inserted successfully",
            data: response
        })
    }
    else {
        res.status(400).json({
            message: "Failed to insert feedback"
        })
    }
}
const getFeedback = async (req, res) => {
    const response = await feedback.find().populate("order_id")
    .populate({
        path: "order_id",
        populate: {
            path: "user_id",
        }}) 
    // }).populate({
    //     path:"user_id"
    // })
    if (response) {
        res.status(200).json({
            message: "Feedback retrieved successfully",
            data: response
        })
    }
    else {
        res.status(400).json({
            message: "Failed to insert feedback"
        })
    }
}

module.exports = {insertFeedback,getFeedback}