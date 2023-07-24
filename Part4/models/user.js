const mongoose = require('mongoose')
require('dotenv').config()
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        const obj = returnedObject
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
        delete obj.passwordHash
        return obj
    }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User