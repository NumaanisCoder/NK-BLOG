const mongoose = require('mongoose');

module.exports.DBConnection = () => {

    mongoose.connect('mongodb+srv://numaanqureshi:12345@cluster0.lrboy7t.mongodb.net/NKBLOG-APPLICATION')
    .then(()=>{
        console.log("DB CONNECTED");
    })
    .catch((err)=>{
        console.log(`PROBLEM OCCUR AT DB ${err}`);
    })
}
