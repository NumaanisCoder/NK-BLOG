const jwt = require("jsonwebtoken");
const Blog = require("../module/blog");
const User = require("../module/user");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadImage } = require("../utils/imagekit");



module.exports.createBlog = async (req, res, next) => {
const imagefile = req.file;
  const { token } = req.params;
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(id);
  const { title, content, category,summary} = req.body;
  image = await uploadImage(imagefile.buffer, imagefile.originalname);
  if(!category){
    category = 'Personal thought'
  }
  if(!title || !content || !category || !image){
    return next(new ErrorHandler(409, "Incomplete Blog Values"))
  }
  const blog = new Blog({ title, image, content, category,summary });
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
  const {query} = req.body;
  console.log(req.body);
  let regex = new RegExp(query, "i");
  const blogs = await Blog.find({ title: regex }).populate("user").sort({_id: -1}).exec();
  res.status(200).json({
    blogs: blogs,
  });
};

module.exports.getUserBlogs = async (req,res,next) =>{
  const { token } = req.params;
  if(!token){
    return next(new ErrorHandler(401,'Not Authenticated'));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const blogs = await Blog.find({user:id}).sort({_id:-1});
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
module.exports.updateUserBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, category,summary } = req.body;
  console.log(summary);
  let image; // declare image variable

  const imagefile = req.file;

  if (imagefile) {
    image = await uploadImage(imagefile.buffer, imagefile.originalname);
  }

  // Update the blog, including the image if it exists
  const updatedFields = { title, content, category,summary };
  if (image) {
    updatedFields.image = image;
  }

  await Blog.findByIdAndUpdate(id, updatedFields);

  res.json({
    success: true,
  });
};


module.exports.getSingleBlogByID = async (req,res) =>{
  const {id} = req.params;
  const blog = await Blog.findById(id).populate('user').sort({_id: -1}).exec();
  await blog.save();
  console.log(blog);
  res.status(200).json({
    success: true,
    blog: blog
  })
}
module.exports.getSingleBlogByTitle = async (req,res) =>{
  const {title} = req.params;
  const newTitle = title.replace(/-/g," ");
  const newTitle2 = newTitle.replace(/~/g,"-");
  console.log(newTitle2);
  const blog = await Blog.findOne({title: newTitle2}).populate('user').sort({_id: -1}).exec();
  res.status(200).json({
    success: true,
    blog: blog
  })
}

