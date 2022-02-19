const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {JWT_SECRET} = require('../Keys');
const requireLogin = require('../middleware/requireLogin');


// router.get('/protected',requireLogin,(req,res)=>{
//     res.send('hello')
// })

router.post('/signup',(req,res)=>{
    //  console.log(req.body.name)
    const {name,email,password} = req.body;
    if(!email || !password || !name){
        // return res.status(400).send('please enter all the fields');
       return  res.status(422).json({error:'please enter all the fields'})
    }
        User.findOne({email:email})
        .then((savedUser) => {
            if(savedUser){
               return  res.status(422).json({error:'User already exists'})
            }
            bcrypt.hash(password,12)
            .then(hashedpassword => {
                const user = new User({
                    name,
                    email,password:hashedpassword
                })
    
                user.save().then(user=>{
                    res.json({message:"saved successfully "})
                }).catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })
            })
           
})

router.post('/signin',(req,res)=>{
const {email,password}=req.body
if(!email || !password){
    return res.status(422).json({error:'please provide email or password'})
}
User.findOne({email:email})
.then(savedUser =>{
    if(!savedUser){
     return    res.status(404).json({error:'Invalid Email or password'})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch =>{
        if(doMatch){
            // res.json({message:'successfully signed in'})
const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
const {_id,name,email}=savedUser;
res.json({token,User:{_id,name,email}});
        }else{
            return res.status(404).json({error:'Invalid Email or password'})
        }
    })
    .catch(error =>{
        console.log(error)
    })
})
})

module.exports = router