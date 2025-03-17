const multer = require("multer");
const productSchema = require("../Models/ProductModel")
const cloudinary = require("./CloudinaryUtil")



const getAllProduct = async (req, res) => {

    const product = await productSchema.find().populate("size_id").populate("location_id");
    if (product) {
        res.status(201).json({
            data: product,
            message: "Successfully got all the Product"
        })
    }
    else {
        res.status(404).json({
            message: "No Product found"
        })
    }
}
const storage = multer.diskStorage({
    destination: "./upload/",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/txt") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
}).single("productImg");

const productAdd = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log('File upload error:', err);
                return res.status(500).json({
                    message: "File Upload Failed",
                });
            }
            // Upload image to Cloudinary
            const result = await cloudinary.uploadimg(req.file.path);
            if (!result || !result.secure_url) {
                return res.status(500).json({
                    message: "Image upload failed",
                });
            }

            // Create product object
            const product = {
                name: req.body.name, // hoardings
                type: req.body.type, // lighting, non-lighting
                duration: req.body.duration, // 24hrs
                isAvailable: req.body.isAvailable, // yes for rent, for sale
                size_id: req.body.size_id,
                // price: price,
                productImg: result.secure_url,
                location_id: req.body.location_id,
            };

            // Save product to database
            const response = await productSchema.create(product);
            if (response) {
                res.status(201).json({
                    data: response,
                    message: "Product added successfully",
                });
            } else {
                res.status(400).json({
                    message: "Product not added",
                });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: "An error occurred while adding the product",
        });
    }
};



const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deleteproduct = await productSchema.findByIdAndDelete(id)
    if (deleteproduct) {
        res.status(200).json({
            data: deleteproduct,
            message: 'product deleted Successfully'
        })
    }
    else {
        res.status(404).json({
            message: 'No such product found'
        })
    }
}

const updateProduct = async (req, res) => {

    const id = req.params.id;
    const updatedProduct = await productSchema.findByIdAndUpdate(id, req.body)
    if (updatedProduct) {
        res.status(201).json({
            data: updatedProduct,
            message: "product user Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "No Such product Updated"
        })
    }
}

const getSingleProduct = async (req, res) => {

    const id = req.params.id;
    const product = await productSchema.findById(id).populate("size_id").populate("location_id")
    if (product) {
        res.status(200).json({
            data: product,
            message: "Product Fetched Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "Product not Fetched Successfully"
        })
        
    }




}



module.exports = {
    getAllProduct,
    productAdd,
    deleteProduct,  
    updateProduct,
    getSingleProduct
}