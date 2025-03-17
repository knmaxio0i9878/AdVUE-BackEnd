
const router = require("express").Router()

const Inquiryrouter = require("../Controller/InquiryController")


router.post("/getinquiry",Inquiryrouter.getInquiry)

module.exports = router