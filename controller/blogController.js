const jwt = require("jsonwebtoken");
const Blog = require("../module/blog");
const User = require("../module/user");

module.exports.createBlog = async (req,res) => {
    const {token} = req.cookies;
    const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    const {title,image,content} = req.body;
    const blog = new Blog({title,image,content});
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
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        blogs: user.blogs
    }) 
}