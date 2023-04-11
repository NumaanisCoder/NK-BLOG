const jwt = require("jsonwebtoken");
const Blog = require("../module/blog");
const User = require("../module/user");
const ErrorHandler = require("../utils/ErrorHandler");


module.exports.createBlog = async (req, res, next) => {
console.log(req.body);
  const { token } = req.cookies;
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(id);
  const { title, content, category, image } = req.body;
  if(!title || !content || !category || !image){
    return next(new ErrorHandler(409, "Incomplete Blog Values"))
  }
  const blog = new Blog({ title, image, content, category });
  blog.user = user;
  user.blogs.push(blog);
  await blog.save();
  await user.save();
  res.status(201).json({
    success: true,
    message: "Blog Created Successfully",
  });
};

module.exports.getAllBlogs = async (req, res) => {
  const { token } = req.cookies;
  const { id } = jwt.verify(token,'cristianoronaldogreatestofalltime');
  const blogs = await Blog.find({ user: id });
  res.status(200).json({
    success: true,
    blogs: blogs,
  });
};

module.exports.homecontent = async (req, res) => {
  const { query, category } = req.body;
  let regex = new RegExp(query, "i");
  const blogs = await Blog.find({ title: regex });
  res.status(200).json({
    blogs: blogs,
  });
};

module.exports.getUserBlogs = async (req,res,next) =>{
  const { token } = req.cookies;
  if(!token){
    return next(new ErrorHandler(401,'Not Authenticated'));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const blogs = await Blog.find({user:id});
  res.status(200).json({
    blogs: blogs
  })
}

module.exports.deleteUserBlog = async (req,res,next) => {
  const {id} = req.params;
  await Blog.findByIdAndDelete(id);
  res.json({
    success: true
  })
}
module.exports.updateUserBlog = async (req,res,next) => {
  const {id} = req.params;
  const {title,image,content, category} = req.body;

  await Blog.findByIdAndUpdate(id,{title,image,content,category});
  res.json({
    success: true
  })
}
