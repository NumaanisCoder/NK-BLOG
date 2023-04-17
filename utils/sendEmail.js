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
    <div style="text-align: center";>
    <h1>RESET LINK</h1>
    <p>
    <a href= "https://nkblogs.ml/resetpassword/${sendToken(user)}">Reset Password</a>
    </p>
    </div>`
  };
  await mailTransporter.sendMail(details);
};

module.exports = resetPassword;
