const express = require('express');
const app = express();
require('dotenv').config({path: './config/.env'});
const port = process.env.PORT || 3000 ;
const cookie = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const { DBConnection } = require('./config/db');
const bodyParser = require('body-parser');
const blog = require('./module/blog');
const cors = require('cors')


//body-parser to parse the data from body in POST method.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  
app.use(cors({
    origin: ['https://nkblogs.ml', 'http://localhost:3001'],
    credentials: true
}));


//middlewares
app.use(cookie());
app.use(userRouter);
app.use(blogRouter);

//DB Connection
DBConnection();


app.get('/get', async (req,res)=>{
    const blogs = await blog.find({}).populate("user").sort({_id: -1}).exec();
    res.status(200).json({
        message: "Server is ok",
        blogs: blogs
    })
})

app.get('/', async (req,res)=>{
    res.status(200).json({
        message: "SERVER IS FINE.."
    })
})

app.use((err,req,res,next)=>{
    const {status, message} = err;
    res.status(status).send({
        success: false,
        status: status,
        message: message
    })
    console.log(err);
})

app.listen(port , ()=>{
    console.log(`Server is On http://localhost:${port}/`);
})