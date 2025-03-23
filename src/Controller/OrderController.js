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
const updateOrderComplete = async (req, res) => {
    const id = req.params.id
    const emailBody = `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h3 style="color: #333;">Congratulations !</h3><br/>
    <h3 style="color: #333;">Your Order with AdVUE advertisement has been successfull.</h3><br/>

    <p>Thank you for chosing us. We will provide you the best deals and more in future also.</p>
    <p>If you love our services and please give feedback from your profile section.</p>

    
    
    <p style="margin-top: 20px; color: #555;">If you have any questions, feel free to contact us.</p> <br />

    <p style="margin-top: 20px; color: #555;">AdVUE Office : 8140952934 </p> <br />

  </div>
`;

    try {
        const order = await orderschema.findById(id).populate("user_id")
        const email = order?.user_id?.email
        console.log("email",email);
        const orderstatus = {
            status: req.body.status,
            halfamount: req.body.halfamount,
            remainingamount: req.body.remainingamount
        }

        const response = await orderschema.findByIdAndUpdate(id, orderstatus)
        await mail.sendingMail(email,"AdVUE Order Success",emailBody)
        if (response) {
            res.status(201).json({
                data: response,
                message: 'Order updated Successfully'
            })
        }
        else {
            res.status(404).json({
                message: 'No such Order found'
            })
        }
    }
    catch (error) {
        console.log(error);

    }



}
const updateOrderCancel = async (req, res) => {
    const id = req.params.id
    const emailBody = `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h3 style="color: #333;">We are sorry to say you that your order is being cancelled due to unpaid payment !</h3><br/>
    <h3 style="color: #333;">If you want to continue then pay the remaining payment. The number of days will not be added to your advertisement.</h3><br/>
    <h3 style="color: #333;">You can pay the remaining amount that we provided bank details on your previous email.</h3><br/>
    <h3 style="color: #333;">Here is the upi details also : <b><ul>pmakwana1908@ohkhdhc</ul></b></h3><br/>



    
    
    <p style="margin-top: 20px; color: #555;">If you have any questions, feel free to contact us.</p> <br />

    <p style="margin-top: 20px; color: #555;">AdVUE Office : 8140952934 </p> <br />

  </div>
`;

    try {
        const order = await orderschema.findById(id).populate("user_id")
        const email = order?.user_id?.email
        console.log("email",email);
        const orderstatus = {
            status: req.body.status,
            halfamount: req.body.halfamount,
            remainingamount: req.body.remainingamount
        }

        const response = await orderschema.findByIdAndUpdate(id, orderstatus)
        await mail.sendingMail(email,"AdVUE Order Cancelled",emailBody)
        if (response) {
            res.status(201).json({
                data: response,
                message: 'Order updated Successfully'
            })
        }
        else {
            res.status(404).json({
                message: 'No such Order found'
            })
        }
    }
    catch (error) {
        console.log(error);

    }

}
module.exports = {
    addOrder,
    getAllOrders,
    getSingleOrder,
    deleteOrder,
    updateOrderComplete,
    updateOrderCancel

}