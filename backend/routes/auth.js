const router=require('express').Router()
 const User=require('../models/UserModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const secret=process.env.SECRET
 router.post('/register',async(req,res)=>{
    const salt=await bcrypt.genSaltSync(10)
    const hashedPass=await bcrypt.hashSync(req.body.password,salt)
    try{
        const newUser=new User({
            username:req.body.username,
            password:hashedPass,
        })
        const user=await newUser.save()
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
 })

 router.post('/login',async(req,res)=>{
     try{
        const username=req.body.username
    const user=await User.findOne({username:req.body.username})
    !user && res.status(400).json('wrong credentials')

    const verifyPass= bcrypt.compareSync(req.body.password,user.password)
    
    if(verifyPass){

        jwt.sign({username,id:user._id},secret,{  },async(err,token)=>{
            if(err)throw err
            res.cookie('token',token).json({id:user._id,username})
            // localStorage.setItem("token",token)
    
        })
    }else{
        res.status(400).json('wrong credentials')
    }
    

    }catch(err){
        res.status(500).json(err)
    }
 })

router.post('/logout',async(req,res)=>{
    res.cookie('token','').json('ok')
})


router.get('/profile',async(req,res)=>{
    const {token}=req.cookies
    if(!token)return ''
    jwt.verify(token,secret,{},(err,info)=>{
        if(err)throw err
        res.json(info)
    })
})

 module.exports=router