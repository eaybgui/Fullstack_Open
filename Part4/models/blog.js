const mongoose = require('mongoose')
const { use } = require('../app')
require('dotenv').config()

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        const obj = returnedObject
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
        return obj
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog