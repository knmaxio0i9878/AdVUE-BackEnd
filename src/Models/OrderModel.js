const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = {
    user_id:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    product_id:{
        type:Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount:{
        type:Number,
    },
    halfamount:{
        type:Number,
    },
    remainingamount:{
        type:Number,
    },
    start_dt:{
        type:Date,
    },
    order_dt:{
        type:Date,
    }
}
module.exports = mongoose.model("OrderModel",OrderSchema)