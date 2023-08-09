const mongoose=require('mongoose')
const {Schema,model}=mongoose

const PostSchema=new Schema({
    title:{
        type:String,
        
    },
        summary:{
            type:String,
            
        },
        content:{
            type:String,
            
        },
        cover:{
            type:String,
            
        },
        author:{
            type:Schema.Types.ObjectId,ref:'user'
        },
    
},{
    timestamps:true,
})

const PostModel=model('post',PostSchema)
module.exports=PostModel