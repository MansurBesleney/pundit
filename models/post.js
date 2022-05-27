const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    author: {type: String, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', PostSchema)