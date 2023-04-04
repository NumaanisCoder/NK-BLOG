const mongoose = require('mongoose');

module.exports.DBConnection = () => {

    mongoose.connect('mongodb+srv://admin:00921120Nn@cluster0.lrboy7t.mongodb.net/NK-BLOG?retryWrites=true&w=majority')
    .then(()=>{
        console.log("DB CONNECTED");
    })
    .catch((err)=>{
        console.log(`PROBLEM OCCUR AT DB ${err}`);
    })
}


// mongodb+srv://numaan:21032002@cluster0.h0rjrno.mongodb.net/testfarms?retryWrites=true&w=majority