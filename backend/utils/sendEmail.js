const nodemailer = require("nodemailer");

const sendEmail = (data) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        port: 456,
        host: "smtp.gmail.com"
    })

    const mailOptions = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.text
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log(info);
        }
    })
}


module.exports = sendEmail;