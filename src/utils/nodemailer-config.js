const nodemailer = require("nodemailer");
   
   let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "upcodeapp.team@gmail.com", 
          pass: process.env.NODEMAILER_PASS, 
        },
      });

module.exports = {
    transporter
}