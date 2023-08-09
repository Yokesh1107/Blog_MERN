
import { useState } from 'react'
import Form from '../components/Form'

const Register = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const registerFun=async(e)=>{
    e.preventDefault()
    const res=await fetch('http://localhost:2003/auth/register',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-type':'application/json'},
    })
    if(res.status===200){
      alert('registration success')
    }
  }
  return (
    <div className='login'>
    <h2>Register - form</h2>
        <form className='log-form' onSubmit={registerFun}>
        <input type='text' placeholder='username' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <input type='password' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button>Register</button>
        
        </form>
     
    </div>
  )
}

export default Register
