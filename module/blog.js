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
    category: {
        type: String,
        enum: ['Technology','Programming','Wildlife','Education','Personal thought','Travel','Video Games','Anime','Movie','Sports','News','Tutorial'],
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId, ref:'user'
    },
    summary:{
        type: String
    },
    createdAt:{
        type: Number,
        default: Date.now()
    },
    views: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('BLOG',blogSchema);