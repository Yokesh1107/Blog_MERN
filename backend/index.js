const express=require('express')
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const authRoutes=require('./routes/auth')
const postRoutes=require('./routes/post')
const cookieParser=require('cookie-parser')
const Post=require('./models/PostModel')
const app=express()
app.use(cookieParser())
const PORT=process.env.PORT||4000
app.use(cors({credentials:true,origin:'https://64d3d4964f5acf0aea6b1b7c--effortless-yeot-69d976.netlify.app/'}))
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))


app.use('/auth',authRoutes)
app.use('/post',postRoutes)

app.get('/post',async(req,res)=>{
    const posts=await Post.find().populate('author','username').sort({createdAt:-1}).limit(20)
    res.json(posts)
})


app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
})

mongoose.connect(process.env.MONGO_URL,
    console.log("Database connected")
)
