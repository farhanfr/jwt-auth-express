const User = require('./../models/users')
const Auth = require('../utils/Authentication')
const Jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

exports.register = async (req,res,next)=>{
    let {firstname,lastname,email,password} = req.body
    const user = await User.findOne({email})
    if (user) {
        return res.status(403).json({
            'status':403,'message':"email already exist"
        })
    }
    password = await Auth.hashPassword(password)
    console.log(password)
    const newUser = new User({firstname,lastname,email,password})
    try {
        await newUser.save()
        res.status(200).json({
            'status':200,'message':"success register",'data': newUser
        })    
    } catch (error) {
        error.status = 400
        next(error)
    }
    
}

exports.login = async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        res.status(403).json({
            'status':403,'message':"invalid email"
        })
    }
    const comparePassword = await Auth.comparePassword(password,user.password)
    const token = Auth.getSignedToken(user)
    if (!comparePassword) {
        res.status(403).json({
            'status':403,'message':"invalid password"
        })
    }else{
        res.status(200).json({
            'status':200,'message':"success login",'data':{token}
        })
    }
}