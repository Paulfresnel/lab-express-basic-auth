const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../models/User.model')

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', (req, res)=>{
    console.log(req.body)
    const { username, password } = req.body
    User.find({username})
    .then(user =>{
        console.log(user)
       return bcrypt.compareSync(password, user[0].hashedPassword)
    })
    .then (confirmation=>{
        console.log(confirmation)
        if (confirmation === true){
            res.redirect('/home')
        }
        else {
            res.redirect('/error')
        }
    })
})

router.get('/home', (req, res)=>{
    console.log(res)
    console.log(req)
    res.render('home')
})


router.get('/error', (req,res)=>{
    res.render('login-error')
})


module.exports = router