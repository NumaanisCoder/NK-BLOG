const { DBConnection } = require("../config/db");
const Blog = require("../module/blog");

DBConnection();

async function huhu(){
const title = "Goku Black Skin arrives at Item Shop in Fortnite";
const newtitle = title.replace(/ /g,"-");
const blog = await Blog.find({title: "Goku Black Skin arrives at Item Shop in Fortnite"});
console.log(blog);
}
// huhu();
const title = "Goku-Black-Skin-arrives-at-Item-Shop-in-Fortnite";
const newtitle = title.replace(/-/g," ");
console.log(newtitle);
