const User = require("../module/user");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/sendToken");
const jwt = require("jsonwebtoken");
const resetPassword = require("../utils/sendEmail");

let otp = Math.floor(Math.random() * 999999 + 100000);

module.exports.createUser = async (req, res, next) => {
  try{
  const { username, email, password } = req.body;
  const test_user = await User.findOne({ email: email });
  const test_user2 = await User.findOne({ username: username });

  if(test_user2){
    return next(new ErrorHandler(409, "username already taken"));
  }
  if (test_user) {
    return next(new ErrorHandler(409, "email had already registered"));
  }
  const user = new User({ username, email, password });
  user.save();
  await User.findOneAndUpdate(
    { email: email },
    { password: await bcrypt.hash(password, 12) },
    { new: true }
  );
  let token1;
        await sendToken(user).then((token)=>{
        token1 = token;
        })
        res.json({
          success: true,
          token: token1
        })
}catch(e){
  console.log(e);
}
};

module.exports.login = async (req, res, next) => {
  const  token  = req.cookies['token'];
  if (token) {
    const { id } = jwt.verify(token, 'cristianoronaldogreatestofalltime');
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
        await sendToken(user).then((token)=>{
        token1 = token;
        })
        res.json({
          success: true,
          token: token1
        })
        
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
      message: user
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

module.exports.loginByToken = async (req,res) => {
  const {token} = req.params;
  const {id} = jwt.verify(token,'cristianoronaldogreatestofalltime');
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    message: user
  })
}

module.exports.sendOtp = async (req,res) => {
  const {email} = req.body;
  const user = await User.findOne({email: email});
  if(user){
    console.log(user);
    resetPassword(user,otp,'hcddshcbschgsv');
    res.status(200).json({
      success: true,
      message: `Otp sent successfully to ${user.email}`
    })
  }else{
    res.status(404).json({
      success: false,
      message: `${email} is not registered`
    })
  }
}

module.exports.VerifyUser = async (res,req) => {
  const {token} = req.body;
  const {id} = jwt.verify(token,process.env.JWT_SECRET_KEY);
  const user = await User.findById(id);
  if(user){
    res.status(200).json({
      success: true,
      message: "user is verified"
    })
  }
}

module.exports.updateUserPassword = async (req,res) =>{
  const {token} = req.params;
  const {id} = jwt.verify(token,process.env.JWT_SECRET_KEY);
  const {password} = req.body;
  await User.findByIdAndUpdate(id,{password: password});
  res.status(200).json({
    success: true,
    message: 'it is on'
  })
}
