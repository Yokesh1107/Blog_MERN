const router=require('express').Router()
 const Post=require('../models/PostModel')
 const multer=require('multer')
 const jwt=require('jsonwebtoken')
 const fs=require('fs')
 require('dotenv').config()
 const secret=process.env.SECRET
const session=require('express-session')
 const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    }
 })
 const upload=multer({storage:storage})
app.use(session({
    resave:"true",
    saveUninitialized:"true",
    secret:process.env.SECRET,
    cookie:{
        sameSite:"none",
    },
}))

 router.post('/create',upload.single('file'),async(req,res)=>{
    
    console.log(req.body)
    const {originalname,path}=req.file
    const parts=originalname.split(".")
    const ext=parts[parts.length-1]
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath)
     const {token}=req.cookies
        jwt.verify(token,secret,{},async(err,info)=>{
            if(err)throw err
            console.log(info) 
            const {title,summary,content}=req.body
    const savedPost=await Post.create({
        title,summary,content,cover:newPath,author:info.id,
    })   
            res.status(200).json(savedPost)
        })
    


 })

 

router.get('/:id',async(req,res)=>{
    const {id}=req.params
    const postDoc=await Post.findById(id).populate('author',['username'])
    res.json(postDoc)
})

router.put('/',upload.single('file'),async(req,res)=>{
    let newPath=null
    if(req.file){
    const {originalname,path}=req.file
    const parts=originalname.split('.')
    const ext=parts[parts.length-1]
     newPath=path+'.'+ext
    fs.renameSync(path,newPath)

    }
    const {token}=req.cookies
    jwt.verify(token,secret,{},async(e,info)=>{
        if(e)throw e;
        const {id,title,summary,content}=req.body
        const postDoc=await Post.findById(id)
        const isAuthor=(JSON.stringify(postDoc.author)===JSON.stringify(info.id))
        if(!isAuthor){
            return res.status(400).json('You are not the owner')
            // throw 'You are not the owner'
        }
        await postDoc.updateOne({title,summary,content,cover:newPath ? newPath : postDoc.cover,})
        res.status(200).json(postDoc)
    })
    
})

 module.exports=router
