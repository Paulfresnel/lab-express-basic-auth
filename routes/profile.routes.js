const router = require("express").Router();
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middlewares/route-guard')

router.get('/personal-data', isLoggedIn, (req,res)=>{
    const { username } = req.session.currentUser
    console.log(username)
    res.render('personal/data', {username})
})

router.get('/private', isLoggedIn, (req,res)=>{
    const { username } = req.session.currentUser
    console.log(username)
    res.render('personal/private', {username})
})

router.post('/home-edit', (req,res)=>{
    const { username } = req.body
    console.log("userNAME" + username)
    User.findOne({username})
    .then(user=>{
        if (!user){
            req.session.currentUser.username = username
            User.findByIdAndUpdate(req.session.currentUser._id, {username: username}, {new:true})
            .then(editedUser=>{
                console.log("edited user:")
                console.log(editedUser)
                res.redirect('/home')
            })
        }else if (user){
            res.render('personal/data', {errorMessage: "This username already exists! Choose another one"})
        }
    })

    
    
})

module.exports = router