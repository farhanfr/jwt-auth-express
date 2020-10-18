const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const userRoutes = require('./routes/UserRoutes')
const auth = require('./middlewares/auth')

app.use('/api/users',userRoutes)
app.use('/api/protected',auth,(req,res)=>{
    res.end(`hi ${req.app.locals.credential.id.firstname}, you are authenticated`)
})
app.use((err,req,res,next)=>{
    const status = err.status || 500
    res.status(status).json({error:{message:err.message}})
})


app.use((req,res,next)=>{
    const err = new Error('not found')
    err.status = 404
    next(err)
})


const { MONGODB } = require('./config')

mongoose.connect(MONGODB, { useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
    console.log("connect to mongodb")
    app.listen(8080)
}).then(() => {
    console.log("run server")
}).catch(err => console.log(err.message))

