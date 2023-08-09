import { useEffect, useState } from "react"
import Editor from "../components/Editor"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom";
const EditPost = () => {
  const [title,setTitle]=useState('')
  const [summary,setSummary]=useState('')
  const [content,setContent]=useState('')
  const [file,setFile]=useState('')
  const [redirected,setRedirect]=useState(false)
  const {id}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    fetch('http://localhost:2003/post/'+id).then(res=>{
      res.json().then(postInfo=>{
        setTitle(postInfo.title)
        setSummary(postInfo.summary)
        setContent(postInfo.content)
      })
    })
  },[])
  const updatePost=async(e)=>{
    e.preventDefault()
    const data=new FormData()
    data.append('title',title)
    data.append('summary',summary)
    data.append('content',content)
    data.append('id',id )
    if(file?.[0]){
      data.append('file',file?.[0])
    }
    const res= await fetch('http://localhost:2003/post/',{
      method:'PUT',
      body:data,
      credentials:'include',
    })
    if(res.status===200){
      setRedirect(true)
      
    }

  }
  
  useEffect(()=>{
    const coo=document.cookie
    
      if(coo==='token='){
           navigate('/')
      }

  },[])
  if(redirected){
       navigate('/post/'+id)
  }

  return (
    <div className="create">
    <h2>Edit Post</h2>
    <form onSubmit={updatePost}>
    <div className="inputs">
    <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <input type="text" placeholder="Summary" maxLength="40" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
    <input type="file" onChange={(e)=>setFile(e.target.files)}/>
    </div>
    <Editor value={content} onChange={setContent}/>
    <button>Submit</button>
    </form>
    </div>
  )
}

export default EditPost

