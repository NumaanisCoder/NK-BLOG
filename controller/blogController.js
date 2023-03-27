const jwt = require("jsonwebtoken");
const Blog = require("../module/blog");
const User = require("../module/user");

module.exports.createBlog = async (req,res) => {
    const {token} = req.cookies;
    const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    const {title,image,content,category} = req.body;
    const blog = new Blog({title,image,content,category});
    blog.user = user;
    user.blogs.push(blog);
    await blog.save();
    await user.save();
    res.status(201).json({
        success: true,
        message: "Blog Created Successfully"
    })
}

module.exports.getAllBlogs = async(req,res) => {
    const {token} = req.cookies;
    const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const blogs = await Blog.find({user: id});
    res.status(200).json({
        success: true,
        blogs: blogs
    }) 
}

module.exports.homecontent = async (req,res) => {
    const {query, category} = req.body;
    let regex = new RegExp(query,'i');
   const blogs =  await Blog.find({title: regex});
   res.status(200).json({
    blogs: blogs
   })
   
  
}