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

const resetPassword = async function(user){
  const token = await sendToken(user);
  const mailTransporter = nodemailer.createTransport(
    {
      service: "gmail",
      auth: {
        user: "nodemailernumaan@gmail.com",
        pass: "xouggbqaqtrebalw",
      },
    },
   
  );
  const details = {
    from: "nodemailernumaan@gmail.com",
    to:`${user.email}`,
    subject: "Reset Password",
    text:`https://localhost:3000/user`,
    html: `
    <body style="background-color: black;">
    <div style="text-align: center;">
    <h1 style="text-align: center;
    color: black;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: red;"> NK BLOGS </h1> 
     
    <h2 style="margin-top: 30px;">RESET LINK</h2>
    <p>
    👇
    <a href= "https://nkblogs.ml/resetpassword/${token}">Reset Password</a>
    </p>
    </div>
    </body>`
  };
  await mailTransporter.sendMail(details);
};

module.exports = resetPassword;
