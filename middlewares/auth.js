const jwt = require('jsonwebtoken')

const {SECRET_KEY} = require('../config')

module.exports = (req,res,next) =>{
    const authHeader = req.headers.authorization
    const error = new Error()
    error.status = 403
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1]
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY)
                req.app.locals.credential = user
                return next()
            } catch (error) {
                error.message = 'invalid/expired token'
                return next(error)
            }
        }
        error.message = 'authorization token must be bearer [token]'
        return next(error)
    }
     error.message = 'authorization header must be provided'
    return next(error)
    
}