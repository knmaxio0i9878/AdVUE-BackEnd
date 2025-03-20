const { default: mongoose } = require("mongoose");
const orderschema = require("../Models/OrderModel")
const userSchema = require("../Models/UserModel")
const productSchema = require("../Models/ProductModel");
const path = require("path");



const addOrder = async (req, res) => {
    console.log("Received Order Data:", req.body); // Debugging

    const orderDetail = {
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        // amount: req.body.amount,
        halfamount: req.body.halfamount,
        remainingamount: req.body.remainingamount,
        start_dt: req.body.start_dt,
        order_dt: req.body.order_dt
    };

    try {
        const createOrder = await orderschema.create(orderDetail);
        res.status(201).json({
            data: createOrder,
            message: "Order Added Successfully",
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};

const getAllOrders = async (req, res) => {
    const getAllOrders = await orderschema.find().populate("user_id").populate("product_id").populate({
        path: "product_id",
        populate: {
            path: "location_id",
        }   
    }).populate({
        path: "product_id",
        populate: {
            path: "size_id"
        }
    })  
    if (getAllOrders) {
        res.status(200).json({
            data: getAllOrders,
            message: "All Orders Retrieved Successfully",
        })
    }
}

const getSingleOrder = async (req, res) => {
    const id = req.params.id;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid Order ID",
        });
    }

    try {
        // Fetch order and populate the necessary fields
        const order = await orderschema.findById(id).populate("user_id").populate("product_id").populate({
            path: "product_id",
            populate: {
                path: "location_id",

            }
        }).populate({
            path: "product_id",
            populate: {
                path: "size_id"
            }
        })
        // .populate("user_id").populate("product_id")


        // Check if order exists
        if (order) {
            return res.status(200).json({
                data: order,
                message: "Order Retrieved Successfully",
            });
        } else {
            return res.status(404).json({
                message: "Order Not Found",
            });
        }
    } catch (err) {
        // Log the error to help with debugging
        console.error(err);

        // Return a generic server error message
        res.status(500).json({
            message: "Server Error",
            error: err.message, // Optionally include the error message for debugging
        });
    }
};

const deleteOrder = async(req,res)=>{
    const id = req.params.id;
       const deleteOrder = await orderschema.findByIdAndDelete(id)
       console.log(deleteOrder);
       if (deleteOrder) {
           res.status(201).json({
               data: deleteOrder,
               message: 'Ordder deleted Successfully'
           })
       }
       else {
           res.status(404).json({
               message: 'No such State found'
           })
       }
}

module.exports = {
    addOrder,
    getAllOrders,
    getSingleOrder,
    deleteOrder
}