const User = require("../module/user");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/sendToken");
const jwt = require("jsonwebtoken");

module.exports.createUser = async (req, res, next) => {
  try{
  const { name, email, password } = req.body;
  const test_user = await User.findOne({ email: email });
  if (test_user) {
    return next(new ErrorHandler(409, "email had already registered"));
  }
  const user = new User({ name, email, password });
  user.save();
  await User.findOneAndUpdate(
    { email: email },
    { password: await bcrypt.hash(password, 12) },
    { new: true }
  );
  sendToken(user, res);
  res.status(201).json({
    success: true,
    message: "user created successfully",
  });
}catch(e){
  console.log(e);
}
};

module.exports.login = async (req, res, next) => {
  const { token } = await req.cookies;
  if (token) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
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
        sendToken(user, res);
        res.redirect(`/user/${user.id}`);
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
