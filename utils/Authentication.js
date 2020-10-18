const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')
const Config = require('../config')

exports.hashPassword = async (password) =>{
    const hashing = await bcrypt.hash(password,10)
    return hashing
}

exports.comparePassword = async(passwordInput,passwordNow) =>{
    const compare = await bcrypt.compare(passwordInput,passwordNow)
    return compare
}

exports.getSignedToken = (id,firstname,lastname,email,password)=>{
    return Jwt.sign({id,firstname,lastname,email,password},Config.SECRET_KEY,{expiresIn:'1h'})
}