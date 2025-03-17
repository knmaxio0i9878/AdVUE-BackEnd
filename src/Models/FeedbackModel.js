const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FeedbackSchema = {
    order_id:{
        type:Schema.Types.ObjectId,
        ref: 'OrderModel'
    },
    message:{
        type: String,
        required: true
    },
    feedback_dt:{
        type: Date,
    }
}

module.exports = mongoose.model("Feedback",FeedbackSchema)