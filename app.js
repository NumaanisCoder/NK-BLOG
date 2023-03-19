const express = require('express');
const app = express();
require('dotenv').config({path: './config/.env'});
const port = process.env.PORT || 3000 ;
const cookie = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const { DBConnection } = require('./config/db');
const bodyParser = require('body-parser');


//body-parser to parse the data from body in POST method.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middlewares
app.use(cookie());
app.use(userRouter);
app.use(blogRouter);

//DB Connection
DBConnection();


app.get('/', (req,res)=>{
    res.send("Hello World");
})

app.use((err,req,res,next)=>{
    const {status, message} = err;
    res.status(status).send({
        status: status,
        message: message
    })
})

app.listen(port , ()=>{
    console.log(`Server is On ${port}`);
})