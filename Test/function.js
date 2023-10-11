const { DBConnection } = require("../config/db");
const Blog = require("../module/blog");

DBConnection();

const getSingleBlogByTitle = async (title) =>{

    const newTitle = title.replace(/%/g," ");
    const blog = await Blog.findOne({title: newTitle});
    console.log(blog);
    
  }
getSingleBlogByTitle("Swing%into%Action%with%the%Spider-Man%2%PS5%Bundle!");
