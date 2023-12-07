const User = require("../module/user");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const { sendToken, sendEcryptedEmailToken } = require("../utils/sendToken");
const jwt = require("jsonwebtoken");
const { send_otpFunc, sendResetTokenMail } = require("../utils/OTPVerification");


module.exports.verify_otp = async (req,res) => 
{
  const {Emailtoken} = req.params;
  const {otpValue} = req.body;
  const {email} = jwt.verify(Emailtoken, 'cristianoronaldogreatestofalltime');
  const user = await User.findOne({email: email});
  console.log(otpValue);
  console.log(user.otp);
  console.log(user.otp == otpValue);
  let token = await sendToken(user);
  if(user.otp == otpValue){
    res.json({
      success: true,
      message: "user verified",
      token: token
    })
  }else{
    res.json({
      success: false,
      message: "invalid Otp"
    })
  }

  
}

module.exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const test_user = await User.findOne({ email: email });
    const test_user2 = await User.findOne({ username: username });

    if (test_user2) {
      return next(new ErrorHandler(409, "username already taken"));
    }
    if (test_user) {
      return next(new ErrorHandler(409, "email had already registered"));
    }
    const otp = Math.floor(Math.random() * 999999 + 100000);
    send_otpFunc(email,otp);
    const user = new User({ username, email, password, otp});
    user.save();
    await User.findOneAndUpdate(
      { email: email },
      { password: await bcrypt.hash(password, 12) },
      { new: true }
    );
    let token1 = await sendEcryptedEmailToken(email);
    console.log("Token send is ",token1);
    res.json({
      success: true,
      token: token1,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.login = async (req, res, next) => {
  const token = req.cookies["token"];
  if (token) {
    const { id } = jwt.verify(token, "cristianoronaldogreatestofalltime");
    res.redirect(`/user/${id}`);
  } else {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(401, "Incomplete Credentials"));
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (isAuthenticated) {
        let token1;
        await sendToken(user).then((token) => {
          token1 = token;
        });
        res.json({
          success: true,
          token: token1,
        });
      } else {
        return next(new ErrorHandler(401, "Password Incorrect"));
      }
    } else {
      return next(new ErrorHandler(404, "Email is not registered"));
    }
  }
};

module.exports.userprofile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (err) {
    return next(new ErrorHandler(401, err.message));
  }
};

module.exports.logout = async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Cookie Deleted",
    });
};

module.exports.loginByToken = async (req, res) => {
  const { token } = req.params;
  const { id } = jwt.verify(token, "cristianoronaldogreatestofalltime");
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    message: user,
  });
};

module.exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const emailToken = jwt.sign({email: email},  "cristianoronaldogreatestofalltime");
  await sendResetTokenMail(email,emailToken);
  res.status(200).json({
    success: true,
    message: "sent!"
  })
};

module.exports.VerifyUser = async (req, res) => {
  const { token } = req.params;
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(id);
  if (user) {
    res.status(200).json({
      success: true,
      message: "user is verified",
    });
  }
};

module.exports.updateUserPassword = async (req, res) => {
  const { token } = req.params;
  const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { password } = req.body;
  console.log("email : ",email)
  console.log("password : ",password);
  const user = await User.findOne({email: email});
  user.password = await bcrypt.hash(password,12);
  await user.save();
  res.status(200).json({
    success: true,
    message: "password Updated sucessfully",
  });
};

module.exports.resendOTPFunc = async (req,res) =>{
  const {Emailtoken} = req.params;
  const { email } = jwt.verify(Emailtoken, "cristianoronaldogreatestofalltime");
  console.log(email);
  const newotp = Math.floor(Math.random() * 999999 + 100000);
  const user = await User.findOne({email: email});
  user.otp = newotp;
  await user.save();
  send_otpFunc(email,newotp);
  res.status(200).json({
    success: true,
    message: "Otp resend!!"
  })
}


