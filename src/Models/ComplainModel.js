const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ComplainSchema = {
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type: String,
        required: true
    },
    complain_dt:{
        type: Date,
    }
}

module.exports = mongoose.model("Complain",ComplainSchema)