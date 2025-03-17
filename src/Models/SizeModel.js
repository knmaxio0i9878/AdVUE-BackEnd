const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SizeSchema = {
    height:{
        type: Number,
    },
    width:{
        type: Number,
    },
    typesize:{
        type: String, // small,med,large
    },
    total_size:{
        type:String,
    },
    price:{
        type:Number
    }
}

module.exports = mongoose.model("Size",SizeSchema)