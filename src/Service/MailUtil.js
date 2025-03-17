const mailer = require('nodemailer')

const sendingMail = async(to,subject,text) =>{
   
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"pmakwana1908@gmail.com",
            pass:'ygpiwimazhbdotty'
        }
    })

    const mailOptions = {
        from: "pmakwana1908@gmail.com",
        to: to,
        subject: subject,
        html:`<h1>${text}</h1>`
      };
    

    const response = await transporter.sendMail(mailOptions);
    return response;


}
module.exports={sendingMail}