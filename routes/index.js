const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

router.get('/',(req,res)=> res.render('welcome'))
// router.get('/dashboard',ensureAuthenticated,(req,res) => 
// res.render('dashboard'),{
//     user:req.user
// })


router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name
  })
);
module.exports = router