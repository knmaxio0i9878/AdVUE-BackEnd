const InquiryModel = require("../Models/InquiryModel")
const mail = require("../Service/MailUtil")

const getInquiry = async (req, res) => {
    const Inquiry = {
        name: req.body.name,
        mobileno: req.body.mobileno,
        email: req.body.email,
        inquiryType: req.body.inquiryType,
        message: req.body.message
    }

    const emailBody = `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">

    <p>${Inquiry.name} has an inquiry about ${Inquiry.inquiryType}</p>
    
    
    <p style="margin-top: 20px; color: #555;">${Inquiry.message}</p> <br />

    <p style="margin-top: 20px; color: #555;">Contact Number : ${Inquiry.mobileno} </p> <br />

  </div>
`;
    const response = await InquiryModel.create(Inquiry)
    await mail.sendingMail("pmakwana1908@gmail.com", "Inquiry Alert !", emailBody)

    if (response) {
        res.status(200).json({ message: "Inquiry Added Successfully", data: response })
    }
    else {
        res.status(400).json({ message: "Failed to Add Inquiry" })
    }
}

module.exports ={
    getInquiry
}