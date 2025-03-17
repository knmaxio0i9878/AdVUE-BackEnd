const mongoose = require("mongoose")

const InquirySchema = {
    name:{
        type: String,
    },
    mobileno:{
        type: Number,
    },
    email:{
        type: String,
    },
    inquiryType:{
        type: String,
    },
    message:{
        type: String,
    }
}
module.exports = mongoose.model("Inquiry",InquirySchema)