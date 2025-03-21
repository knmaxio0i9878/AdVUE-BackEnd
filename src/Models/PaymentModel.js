const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PaymentSchema = {
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        required: true
    },
    payment_dt:{
        type: Date,
    },
    type:{
        type:String,
    }
}

module.exports = mongoose.model("Payment",PaymentSchema)