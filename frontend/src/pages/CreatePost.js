import { useEffect, useState } from "react"
import Editor from "../components/Editor"
import { useNavigate } from "react-router-dom"
const CreatePost = () => {
  const navigate=useNavigate()
  const [title,setTitle]=useState('')
  const [summary,setSummary]=useState('')
  const [file,setFile]=useState('')
  const [content,setContent]=useState('')
  const [redirect,setRedirect]=useState(false)
  const postFun=async(e)=>{
    
    const data=new FormData()
    data.append('title',title)
        data.append('summary',summary)
        data.append('content',content)
        data.append('file',file[0])
        data.append('files',file[1])
    e.preventDefault()
    const res=await fetch('https://blog-mern-8yfu.onrender.com/post/create',{
      method:'POST',
      credentials:'include',
      body:data,
    })
    if(res.ok){
      setRedirect(true)
    }
  }
  useEffect(()=>{
    const coo=document.cookie
    if(coo==='token='){
           navigate('/')
      }

  },[])
  if(redirect){
    navigate('/posts')
  }
  return (
    <div className="create">
    <h2>Create A New Post</h2>
    <form onSubmit={postFun}>
    <div className="inputs">
    <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <input type="text" placeholder="Summary" maxLength="40" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
    <input className='file'type="file" onChange={(e)=>setFile(e.target.files)}/>
    </div>
    <Editor value={content} onChange={setContent}/>
    <button>Submit</button>
    </form>
    </div>
  )
}
export default CreatePost
