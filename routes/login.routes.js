const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middlewares/route-guard')

router.get('/login', isLoggedOut, (req, res)=>{
    res.render('login')
})

router.post('/login', isLoggedOut, (req, res)=>{
    console.log(req.body)
    const { username, password } = req.body
    User.findOne({username})
    .then(user =>{
        if  (!user){
            console.log("no user found")
            res.render('login', {errorMessage: "User does not exist"})
            return;
        } else if (bcrypt.compareSync(password, user.hashedPassword)) {
            req.session.currentUser = user;
            console.log(req.session.currentUser)
            res.redirect('/home')
        } else if (!(bcrypt.compareSync(password, user.hashedPassword))){
            res.render('login', {errorMessage: "Password is incorrect"})
        }
    })
    .catch(err => console.log(err))
})

router.get('/home', isLoggedIn, (req, res)=>{
    const { username } = req.session.currentUser
    console.log("user Session info:")
    console.log(req.session.currentUser)
    res.render('home', {username})
})

router.post('/logout', isLoggedIn, (req, res)=>{
    req.session.destroy(err=>{
        if(err) console.log(err);
        res.redirect('/')
    })
     
})


router.get('/error', (req,res)=>{
    res.render('login-error')
})


module.exports = router