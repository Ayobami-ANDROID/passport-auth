const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//login
router.get('/login',(req,res)=> res.render('login'))

//register
router.get('/register',(req,res)=> res.render('register'))

//register hanle
router.post('/register',(req,res)=>{
    const {name,email,password,password2} = req.body
    let errors = []
    if(!name || !email || !password || !password2){
        errors.push({msg:'please fill in all fields'})
    }
    if(password !== password2){
        errors.push({msg:'password do not match'})
    }
    if(password.length < 6){
        errors.push({msg:'password should be at least 6 characters'})
    }
    if(password.length >0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        User.findOne({email:email}).then(user =>{
            if(user){
                errors.push({msg:'Email is already registered'})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }else{
               const newUser = new User({
                name,
                email,
                password
               })
               console.log(newUser)
               res.send('hello')
            }
        })
    }
})
module.exports = router