const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const body = request.body
  
    if(body.password === undefined || body.password.length < 3)
    return response.status(400).send({error: 'password must be at least 3 characters long'})

    if(body.username === undefined || body.username.length < 3)
    return response.status(400).send({error: 'username must be at least 3 characters long'})
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
    
    try{
      const savedUser = await user.save()
      response.json(savedUser)
    }catch(exception){
      response.status(400).send({error: 'username must be unique'})
    }
})  

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    response.json(users)
  })
  
module.exports = usersRouter