import React,{useState,useContext,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Post from '../components/Post'
import {format} from 'date-fns'
import { UserContext } from '../components/UserContext'
import { useNavigate } from 'react-router-dom'
const ViewPost = () => {
  const navigate=useNavigate()
  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  useEffect(() => {
    fetch(`https://blog-mern-8yfu.onrender.com/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);
  const coo=document.cookie
    if(coo==='token='){
        return navigate('/')
    }
  if(!postInfo)return ''
  return (
    <div className='viewPost'>
    <div className='cover'>
    <img src= {`https://blog-mern-8yfu.onrender.com/${postInfo.cover}`} />
    </div>
    <div className='title'>{postInfo.title}</div>
    <div className='details'>
    <div className='author'>{postInfo.author.username}</div>
    <div className='time'>{format(new Date(postInfo.createdAt),'MMM d,yyyy hh:mm')}</div>
    </div>
    

      {userInfo.id===postInfo.author._id && (
        <div className='edit'>
        <Link to={`/edit/${postInfo._id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>Edit this post</Link>
      </div>
      )}
    <div className='summary'>{postInfo.summary}</div>
    <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      
    </div>
  )
}

export default ViewPost
