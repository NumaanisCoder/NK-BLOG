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

module.exports.sendResetTokenMail = async (email, token) => {
  const details = {
    from: "nkblogs.no.reply@gmail.com",
    to: email,
    subject: "Reset Link",
    html: `
    <body style="background-color: black;">
    <div style="text-align: center;">
    <br>
    <h1 style="color: red;"> ContentCanvas </h1> 
     
    <h2 style="background-color: aliceblue;">OTP Verification</h2>
    <p style="color: aliceblue;">
    Hello , Click <a href="https://contentcanvas.netlify.app/resetpassword/${token}"> Reset Link </a>
   <br>      
    <br>
    </p>
    <br>
    </div>
    </body>`
  }
  await mailTransporter.sendMail(details);
}

module.exports.send_otpFunc = async (email, otp) => {
    const details = {
      from: "nkblogs.no.reply@gmail.com",
      to: email,
      subject: "OTP VERIFICATION",
      html: `
      <body style="background-color: black;">
      <div style="text-align: center;">
      <br>
      <h1 style="color: purple;"> ContentCanvas </h1> 
       
      <h2 style="background-color: aliceblue;">OTP Verification</h2>
      <p style="color: aliceblue;">
      Hello , Enter <strong>${otp}</strong> to verify
     <br>      
      <br>
      </p>
      <br>
      </div>
      </body>`
    }
    await mailTransporter.sendMail(details);
  }