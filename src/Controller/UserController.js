const userSchema = require("../Models/UserModel")
const tokenUtil = require("../Service/Token")
const mail = require("../Service/MailUtil");
const encrypt = require("../Service/Encrypt")
const { response } = require("express");
// const { default: useLocalStorage } = require("use-local-storage");
// const { default: localStorage } = require("local-storage");


const getAllUser = async (req, res) => {

    const users = await userSchema.find();
    res.status(201).json({
        data: users,
        message: "Successfully got all the Users"
    })
}
const getUserByEmail = async (req, res) => {
    
    const { email } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (user) {
        const token = tokenUtil.generateToken(user.toObject());
        const emailBody = `Click Here for Password Reset : <a href="https://ad-vue-front-end-1908.vercel.app/#/forgotusertoken/${token}"> Reset </a>`;

        await mail.sendingMail(user.email, "Verification of Password", emailBody)
        res.status(201).json({
            data: user,
            message: "User Found"
        })
        const { password } = req.body;
    } else {
        res.status(404).json({
            message: "User Not found"
        }) 
    }
}
const updateForgotUser = async (req, res) => {
    try {
        const token = req.params.token; 
        console.log("Received Token:", token);
        if (!token) {
            res.status(400).json({
                 message: "Token is required" 
            });
        }
        let decoded;
        decoded = jwt.verify(token,"parth1923")
        console.log("decoded",decoded);
        

        const userId = decoded._id; // Extract user ID from token
        console.log("Decoded User ID:", userId);

        console.log("New Password:", req.body.password);

        if (!req.body.password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Encrypt the new password
        let hashedPassword;
        try {
            hashedPassword = await encrypt.hashedPassword(req.body.password);
        } catch (hashError) {
            console.error("Password Hashing Error:", hashError.message);
            return res.status(500).json({ message: "Error hashing password" });
        }

        // Find and update the user
        const updatedUser = await userSchema.findByIdAndUpdate(
            userId, 
            { password: hashedPassword }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            data: updatedUser,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error("Error updating password:", error.message);
        return res.status(500).json({
            message: "An error occurred while updating the password",
            error: error.message,
        });
    }
};

const UserAdd = async (req, res) => {

    const hashedPassword = await encrypt.hashedPassword(req.body.password)

    const user = {
        name: req.body.name,
        email: req.body.email.trim().toLowerCase(),
        password: hashedPassword,
        mobileNo: req.body.mobileNo,
        gender: req.body.gender
    }
    const respose = await userSchema.create(user)
    const code = Math.random() * 100000;
    console.log(code);

    const emailBody = `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h2 style="color: #333;">Welcome to AdVUE Advertisements!</h2>
    <p>We are excited to have you on board. Explore amazing advertisement opportunities with us.</p>
    
    
    <p style="margin-top: 20px; color: #555;">If you have any questions, feel free to contact us.</p> <br />

    <p style="margin-top: 20px; color: #555;">AdVUE Office : 8140952934 </p> <br />

  </div>
`;

    await mail.sendingMail(user.email, "AdVUE", emailBody);


    // localStorage.setItem('authToken', data.token);
    console.log(respose);

    if (respose) {
        res.status(201).json({
            data: user,
            message: "User Added Successfully"
        })
    }
    else {
        res.status(400).json({
            message: "User Not Added"
        })
    }
}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    const deleteUser = await userSchema.findByIdAndDelete(id)
    if (deleteUser) {
        res.status(200).json({
            data: deleteUser,
            message: 'user deleted Successfully'
        })
    }
    else {
        res.status(404).json({
            message: 'No such State found'
        })
    }
}



const updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the password exists in the request body
        if (req.body.password) {
            req.body.password = await encrypt.hashedPassword(req.body.password);
        }
        // if(req.body.otp === ot)

        // Update the user with the modified request body
        const updatedUser = await userSchema.findByIdAndUpdate(id, req.body, { new: true });

        if (updatedUser) {
            res.status(200).json({
                data: updatedUser,
                message: "Updated user successfully",
            });
        } else {
            res.status(404).json({
                message: "No such user found to update",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating the user",
            error: error.message,
        });
    }
};

const updateUserProduct = async (req, res) => {

    const id = req.params.id;
    const productAdd = {

        product: req.body.product,
    }
    const updatedUser = await userSchema.findByIdAndUpdate(id, productAdd)
    if (updatedUser) {
        res.status(201).json({
            data: updatedUser,
            message: "Updated user Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "No Such User Updated"
        })
    }
}

const getSingleUser = async (req, res) => {

    const id = req.params.id;
    const user = await userSchema.findById(id)
    if (user) {
        res.status(200).json({
            data: user,
            message: "User Fetched Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "User not Fetched Successfully"
        })
    }
}

const validateUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user by email
    const validUser = await userSchema.findOne({ email: email });
    console.log("vailduse", validUser);

    if (validUser) {
        // Compare password with the hashed password
        const isPasswordValid = await encrypt.comparePassword(password, validUser.password);
        console.log("..,.,.,.,.", isPasswordValid);

        if (isPasswordValid) {
            // Generate JWT token
            const token = tokenUtil.generateToken(validUser.toObject());

            res.status(200).json({
                data: {
                    user: validUser,
                    token: token
                },
                message: "User Validated Successfully"
            });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
const sendConfirmEmail = async (req, res) => {
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
          ${orderDetails?.product_id?.productImg 
            ? `<p>Your Product:</p> 
               <img src="${orderDetails.product_id.productImg}" alt="Product Image" 
                    style="width: 200px; height: auto; margin-top: 10px; border-radius: 10px;" />`
            : "<p>No image available</p>"
          }
      
          <p><strong>Order ID:</strong> ${orderDetails._id || "N/A"}</p>
          <p><strong>Product Name:</strong> ${orderDetails?.product_id?.name || "N/A"}</p>
          <p><strong>Remaining Amount:</strong> ${orderDetails?.remainingamount || "N/A"}</p>
      
          <p style="margin-top: 20px; color: #555;">Please pay the remaining amount within 48 hours.</p>
          <p style="margin-top: 20px; color: #555;">Please pay the remaining amount with bank Details:-  9102 2901 2891 4160. 
          </br> Account Name :- AdVUE Adevertisments </br>
            UPI ID :- pmakwana1908@okhdfcbank
          </p>
          </br>
          <p> Once you pay the remaing amount please share us the screenshot via email.</p>


          <p style="margin-top: 20px; color: #555;">If you have any questions, feel free to contact us.</p>
      
          <a href="https://ad-vue-front-end-1908.vercel.app/#/userfeedback/${orderDetails?._id}" 
             style="display: inline-block; padding: 10px 20px; background-color: #4A6FA5; color: white; text-decoration: none; border-radius: 5px;">
             Give Feedback
          </a>
      
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
};


module.exports = {
    getAllUser,
    UserAdd,
    deleteUser,
    updateUser,
    getSingleUser,
    validateUser,
    updateUserProduct,
    getUserByEmail,
    updateForgotUser,
    sendConfirmEmail
}