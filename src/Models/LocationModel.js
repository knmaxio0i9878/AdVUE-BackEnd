const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LocationSchema = {
    city:{
        type: String,
    },
    area:{
        type: String,
    },
    latitude:{
        type: String,
    },
    longitude:{
        type: String,
    }
    
}
module.exports = mongoose.model("Location", LocationSchema);