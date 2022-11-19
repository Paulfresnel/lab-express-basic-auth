const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../models/User.model')
const { isLoggedIn, isLoggedOut } = require('../middlewares/route-guard')


router.get('/signup', isLoggedOut, (req,res)=>{
    res.render('signup')
})

router.post('/signup', isLoggedOut, (req,res)=>{
    const { username, password} = req.body
    if (username === '' || password === '') {
        res.render('signup', {
          errorMessage: 'Please enter both, username and password to signup.'
        });
        return;
    }
    User.findOne({username})
    .then(user=>{
        if (!user){
           const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)
            console.log(password)
            console.log(hashedPassword)
            User.create({username, hashedPassword})
            .then(entry =>{
                console.log(entry)
                res.redirect('/login')
            })  
        }else if (user){
            res.render('signup', {errorMessage: "This username already exists!"})
        }
    })
    .catch(err=> console.log(err))  

})



module.exports = router