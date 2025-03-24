const router = require("express").Router()
const userController = require("../Controller/UserController")

router.get("/getuser",userController.getAllUser)
router.post("/adduser",userController.UserAdd)
router.post("/login",userController.validateUser)
router.post("/getuserbyemail",userController.getUserByEmail)
router.delete("/deleteuser/:id",userController.deleteUser)
router.put("/updateuser/:id",userController.updateUser)
router.put("/updateforgotuser/:id",userController.updateForgotUser)
router.put("/updateuserproduct/:id",userController.updateUserProduct)
router.get("/singleuser/:id",userController.getSingleUser)
router.post("/confirmorderemail/:token",userController.sendConfirmEmail)

module.exports = router