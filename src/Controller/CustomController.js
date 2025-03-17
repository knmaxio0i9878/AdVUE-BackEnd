const { model } = require("mongoose");
const customModel = require("../Models/CustumizationModel");
const multer = require("multer");
const cloudinary = require("./CloudinaryUtil");
const mail = require("../Service/MailUtil");



const storage = multer.diskStorage({
    destination: "./custom/", // Directory to save uploaded files locally (before Cloudinary upload)
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed.")); // Reject invalid file types
        }
    }
}).single("productImg");

const insertProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log('File upload error:,.,.,', err);
                return res.status(500).json({
                    message: "File Upload Failed",
                });
            }
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const result = await cloudinary.uploadimg(req.file.path); // Ensure file path is correct
            console.log(result)

            if (!result || !result.secure_url) {
                return res.status(500).json({ message: "Image upload failed" });
            }

            // Continue with the rest of your code to save the product
            const customization = {
                name: req.body.name,
                type: req.body.type,
                area:req.body.area,
                duration: req.body.duration,
                size: req.body.size,
                user_id:req.body.user_id,
                date:req.body.date,
                typesize: req.body.typesize,
                height: req.body.height,
                width: req.body.width,
                price: req.body.price,
                city: req.body.city,
                metres: req.body.metres,
                poles: req.body.poles,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                productImg: result.secure_url, // Cloudinary URL
            };

            const response = await customModel.create(customization);
            // const emailBody = `
            //   <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            //     <h2 style="color: #333;">AdVUE Advertisements!</h2>
            //     <p>We are excited to have you on board. Thanks for opting our Customized Service.</p>
            //     <p>We will let you know all the price details that you had opted according to height and width e.g.(10H x 48H).</p>
            //     <p>You will be updated within 48 hours by call or email.</p>
                
                
            //     <p style="margin-top: 20px; color: #555;">If you have any questions, feel free to contact us.</p> <br />
            
            //     <p style="margin-top: 20px; color: #555;">AdVUE Office : 8140952934 </p> <br />
            
            //   </div>
            // `;
            
            //     await mail.sendingMail(user.email, "AdVUE", emailBody);
            
            if (response) {
                res.status(201).json({
                    data: response,
                    message: "Product inserted successfully",
                });
            } else {
                res.status(400).json({ message: "Product insertion failed" });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred while adding the product", error: error.message });
    }
};

const getAllCustom = async (req, res) => {

    const response = await customModel.find().populate("user_id")
    if (response) {
        res.status(201).json({
            data: response,
            message: "Products retrieved successfully",
        })
    }
    else {
        res.status(400).json({ message: "Products retrieval failed" });
    }
}

const getSingleOrder = async(req,res) =>{
    const id = req.params.id;
    
    const response = await customModel.findById(id).populate("user_id")
    if(response){
        res.status(201).json({
            data:response,
            message:"Custom Single model fetch"
        })
    }
    else{
        res.status(404).json({
            message:"Model Not Fetch"
        })
    }
}

const updateCustomEmail = async(req,res)=>{
    
     try {
            console.log("Request Body:", req.body); // Debugging
            const { email, orderDetails } = req.body; // Extract data
    
            if (!email || !orderDetails) {
                console.error("Missing email or order details in request body");
                return res.status(400).json({ message: "Email and order details are required" });
            }
    
            // Create an email body that includes order details
            const emailBody = `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
              <h2 style="color: #333;">Order Confirmation</h2>
              <p>We are excited to inform you that your order has been confirmed!</p>
          
              <h3>Order Details:</h3>
              ${orderDetails?.productImg 
                ? `<p>Your Product:</p> 
                   <img src="${orderDetails?.productImg}" alt="Product Image" 
                        style="width: 200px; height: auto; margin-top: 10px; border-radius: 10px;" />`
                : "<p>No image available</p>"
              }
          
              <p><strong>Order ID:</strong> ${orderDetails._id || "N/A"}</p>
              <p><strong>Product Opted:</strong> ${orderDetails?.name || "N/A"}</p>
              <p><strong>Total Pricing:</strong> ${
                orderDetails?.name == "Hoardings"?
                ((orderDetails?.height * orderDetails?.width)*600):((orderDetails?.height * orderDetails?.width)*250)
            }</p>
          
              <p style="margin-top: 20px; color: #555;">The Amount of Custumization is 20% higher from the displayed products in our website.</p>
              <p style="margin-top: 20px; color: #555;">80% of Amount will be paid in advance , if you want to book your Advertisement then contact our team or you can email us.
              </p>


              <p style="margin-top: 20px; color: #555;">Also Please Provide your starting date !
              </p>
            


              <p style="margin-top: 20px; color: #555;">If you have any questions, feel free to contact us.</p>
          
            
              <p style="margin-top: 20px; color: #555;">AdVUE Office: 8140952934</p>
            </div>
          `;
          
    
            console.log("Sending email to:", email);
            await mail.sendingMail(email, "AdVUE Order Confirmation", emailBody);
    
            return res.status(200).json({ message: "Email sent successfully" });
    
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Failed to send email", error: error.message });
        }
}

module.exports = { insertProduct,getAllCustom,getSingleOrder,updateCustomEmail };
