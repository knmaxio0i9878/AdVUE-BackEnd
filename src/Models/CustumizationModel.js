const mongoose = require("mongoose")
const  Schema = mongoose.Schema

const CustumizationModel = {
    name:{
        type:String
    },
    type:{
        type:String
    },
    duration:{
        type:String
    },
    typesize:{
        type:String
    },
    height:{
        type:Number
    },
    width:{
        type:Number
    },
    productImg:{
        type:String
    },
    price:{
        type:Number
    },
    size:{
        type:String
    },
    user_id:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    area:{
        type:String
    },
    city:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
    },
    start_dt:{
        type:Date
    }
}
module.exports = mongoose.model("custom",CustumizationModel)