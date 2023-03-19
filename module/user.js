const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =new Schema({
    name:{
        type: String,
        required: [true, 'user name is required']
    },
    avatar:{
        type: String
    },
    email:{
        type: String,
        required:[true,'user email is required']
    },
    password:{
        type:String,
        required: [true, 'password required']
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId
        }
    ]
})

module.exports = mongoose.model('USER',userSchema);