const User = require('../models/user')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ?
        0 :
        blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return max.likes > item.likes ?
            max :
            item
    }
    return blogs.length === 0 ? {} :
        blogs.reduce(reducer, blogs[0])
}



const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    usersInDb
}