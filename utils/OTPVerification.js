const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport(
    {
      service: "gmail",
      auth: {
        user: "nkblogs.no.reply@gmail.com",
        pass: "cqqrpnrlqrrmfwol",
      }
    }
  
   
  );

module.exports.send_otpFunc = async (email, otp) => {
    const details = {
      from: "nkblogs.no.reply@gmail.com",
      to: email,
      subject: "OTP VERIFICATION",
      html: `
      <body style="background-color: black;">
      <div style="text-align: center;">
      <br>
      <h1 style="color: red;"> NK BLOGS </h1> 
       
      <h2 style="background-color: aliceblue;">OTP Verification</h2>
      <p style="color: aliceblue;">
      Hello , Enter ${otp} to verify
     <br>      
      <br>
      </p>
      <br>
      </div>
      </body>`
    }
    await mailTransporter.sendMail(details);
  }