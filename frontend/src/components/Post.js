import React from 'react'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
const Post = ({_id,title,summary,content,cover,createdAt,author}) => {
  return (
    <div className='post'>
    <div className='post-img'>
    <Link to={`/post/${_id}`}>
      <img src={'http://localhost:2003/'+cover}/>
      </Link>
      </div>
      <div className='details'>
        <div className='title'>{title}</div>
        
        <div className='summary'>{summary}</div>
        <div className='post-details'>
        <div className='author'>{author.username}</div>
        <div className='time'>{format(new Date(createdAt),'MMM d,yyyy hh:mm')}</div>
        </div>
        </div>
        </div>
  )
}

export default Post
