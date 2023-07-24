const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        const token = authorization.substring(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        request.user = decodedToken
    }
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}