const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required: [true, 'blog title must required']
    },
    image:{
        type:String,
        required: [true, 'blog image must required']
    },
    content:{
        type:String,
        required: [true, 'blog content must required']
    },
    user:{
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('BLOG',blogSchema);