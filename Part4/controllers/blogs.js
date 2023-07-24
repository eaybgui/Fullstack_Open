const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const {title, author, url, likes} = request.body

    try{
        const user = await User.findById(request.user.id)

        if(title && url){
            const blog = new Blog({
                title,
                author,
                url,
                likes: likes || 0,
                user: user.id
            })
         
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog.id)
            await user.save()
            response.status(201).json(savedBlog)
        }else{
            response.status(400).end()
        }
    }catch(exception){
        return response.status(401).json({ error: 'token missing or invalid' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const {id} = request.params
    
    try{
        const user = await User.findById(request.user.id)
        if(user.blogs.includes(id)){
            await Blog.findByIdAndRemove(id)
        }else{
            return response.status(401).json({ error: 'invalid user' })
        }

    }catch(exception){
        console.log(exception)
    }
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const {id} = request.params
    let likes = request.body.likes
    const blog = {...request.body, likes: ++likes}

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true})
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter