const express = require('express')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const connectDB = require('./db/connectDb')
const flash = require('connect-flash')
const session = require("express-session")
const passport = require('passport')
// const passport = require('./config/passport')
require('dotenv').config()

require('./config/passport')(passport)

const app = express()

const PORT = process.env.PORT || 5000

app.use(expressLayout)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

//express session
app.use(session({
   secret:process.env.secret_key,
   resave:false,
   saveUninitialized:true,
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//flash
app.use(flash())

//Global Vars
app.use((req,res,next)=>{
   res.locals.success_msg = req.flash('success_msg')
   res.locals.error_msg = req.flash('error_msg')
   res.locals.error= req.flash('error')
   next()
})

app.use('/',require('./routes/index.js'))
app.use('/users',require('./routes/users'))
const start =async () =>{
   try {
    await connectDB(process.env.Mongo_URL)
    app.listen(PORT,console.log(`Server stated on port ${PORT}`))
   } catch (error) {
   console.log(error) 
   }
}
 start()