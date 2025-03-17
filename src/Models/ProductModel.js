const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = {
    name: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    type: {
        type: String,
        // required: true
    },
    duration: {
        type: String,
        // required: true
    },
    isAvailable: {
        type: String,
        // required: true
    },
    productImg:{
        type:String
    },
    size_id:{
        type:Schema.Types.ObjectId,
        ref:"Size"
    },
    location_id:{
        type:Schema.Types.ObjectId,
        ref:"Location"
    }
    // size: {
    //     type: String,
    //     // required: true
    // },
    // height: {
    //     type: Number,
    //     // required: true
    // },
    // width: {
    //     type: Number,
    //     // required: true
    // },
    // metres: {
    //     type: String,
    //     // required: true
    // },
    // poles: {
    //     type: String,
    //     // required: true
    // },
   
    
}
module.exports = mongoose.model("Product", ProductSchema)