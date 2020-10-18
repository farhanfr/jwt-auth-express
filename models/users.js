const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password :{
        type:String,
        required:true
    }
})

// userSchema.pre('validate',true, async function(next){
//     var user = this;
//     try {
//         const hashPassword = await bcrypt.hash(user.password,10)
//         user.password = "haloo"
//         console.log("passwordnya woyy : " + hashPassword)
//         next()
//     } catch (error) {
//         console.log(`${error}`)
//     }
// })

module.exports = mongoose.model('users',userSchema);