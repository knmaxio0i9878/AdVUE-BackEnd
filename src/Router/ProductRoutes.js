const   router = require("express").Router()
const productController = require("../Controller/ProductController")

router.get("/getproduct",productController.getAllProduct)
router.post("/addproduct",productController.productAdd)
router.delete("/deleteproduct/:id",productController.deleteProduct)
router.put("/updateproduct/:id",productController.updateProduct)
router.get("/singleproduct/:id",productController.getSingleProduct)

module.exports = router