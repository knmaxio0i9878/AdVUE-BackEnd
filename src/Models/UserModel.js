const mongoose = require('mongoose')
const  Schema  = mongoose.Schema
const UserSchema = {
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    gender:{
        type:String,
    },
    mobileNo:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    productImg:{
        type:String
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    }
    
    
}
module.exports = mongoose.model("User",UserSchema)