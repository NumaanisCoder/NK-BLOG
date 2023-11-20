const nodemailer = require("nodemailer");
const { sendToken } = require("./sendToken");

// function bodymaker(user){
//     const details = {
//         from: 'nodemailernumaan@gmail.com',
//         to:user.email,
//         subject: 'Reset Password',
//         text:`http://localhost:3000/user/${user._id}/resetpassword`
//     }
//     return details;
// }

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
    <h1 style="color: #910FE7;"> NK BLOGS </h1> 
     
    <h2 style="background-color: aliceblue;">OTP Verification</h2>
    <p style="color: aliceblue;">
    Hello <strong>${user.username}</strong>, Enter ${otp} to verify
   <br>      
    <br>
    </p>
    <br>
    </div>
    </body>`
  }
  await mailTransporter.sendMail(details);
}

async function resetPassword(user) {
  const token = await sendToken(user);
 
  const details = {
    from: "nkblogs.no.reply@gmail.com",
    to:`${user.email}`,
    subject: "Reset Password",
    html: `
    <body style="background-color: black;">
    <div style="text-align: center;">
    <br>
    <h1 style="color: #910FE7;"> NK BLOGS </h1> 
     
    <h2 style="background-color: aliceblue;">RESET LINK</h2>
    <p style="color: aliceblue;">
    Hello <strong>${user.username}</strong>, Reset password by clicking on Link Below
   <br>
    <p style="font-size: x-large;">👇</p>

    <button style="border: 2px solid #910FE7; background-color: black; padding: 4px; ">
        <a style="text-decoration: none; padding: 12px; color: #910FE7;" href= "https://contentcanvas.netlify.app/resetpassword/${token}">Reset Password</a>
    </button>
  
        
    <br>
    </p>
    <br>
    </div>
    </body>`
  };
  await mailTransporter.sendMail(details);
};


module.exports.send_otpFunc = async (email, otp) => {
  const details = {
    from: "nkblogs.no.reply@gmail.com",
    to: email,
    subject: "OTP VERIFICATION",
    html: `
    <body style="background-color: black;">
    <div style="text-align: center;">
    <br>
    <h1 style="color: #910FE7;"> NK BLOGS </h1> 
     
    <h2 style="background-color: aliceblue;">OTP Verification</h2>
    <p style="color: aliceblue;">
    Hello <strong>${user.username}</strong>, Enter ${otp} to verify
   <br>      
    <br>
    </p>
    <br>
    </div>
    </body>`
  }
  await mailTransporter.sendMail(details);
}

module.exports.resetPassword = resetPassword;