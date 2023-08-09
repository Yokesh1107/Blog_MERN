import React, { useState ,useEffect, useContext} from 'react'
import Post from '../components/Post'
import { UserContext } from '../components/UserContext'
import { useNavigate } from 'react-router-dom'
const Posts = () => {
    const {userInfo,setUserInfo}=useContext(UserContext)
  const navigate=useNavigate()
  const[posts,setPosts]=useState([])
  useEffect(()=>{
        const res=fetch('https://blog-mern-8yfu.onrender.com/post/').then(response=>{
            response.json().then(posts=>{
                setPosts(posts)
            })
        })
        
        
    },[])
    const coo=document.cookie
    if(coo==='token='){
        return navigate('/')
    }
    return(
        <div className='posts'>
        {posts.length>0 && posts.map(post=>(
            <Post {...post}/>
    ))}
        </div>
        
    )

}

export default Posts
