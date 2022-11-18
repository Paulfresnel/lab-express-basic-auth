const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../models/User.model')

router.get('/signup', (req,res)=>{
    res.render('signup')
})

router.post('/signup', (req,res)=>{
    const { username, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    console.log(password)
    console.log(hashedPassword)
    User.create({username, hashedPassword})
    .then(entry =>{
        console.log(entry)
        res.redirect('/signup')
    })
})


module.exports = router