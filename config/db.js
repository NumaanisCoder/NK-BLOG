const mongoose = require('mongoose');

module.exports.DBConnection = () => {

    mongoose.connect('mongodb://localhost:27017/NKBLOG-APPLICATION')
    .then(()=>{
        console.log("DB CONNECTED");
    })
    .catch((err)=>{
        console.log(`PROBLEM OCCUR AT DB ${err}`);
    })
}