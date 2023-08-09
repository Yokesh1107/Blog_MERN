import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../components/UserContext'
const Login = () => {
  const navigate=useNavigate()
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const {setUserInfo}=useContext(UserContext)
  const loginFun=async(e)=>{
    e.preventDefault()
    const res=await fetch('http://localhost:2003/auth/login',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-type':'application/json'},
      credentials:'include',
    })
    if(res.ok){
      res.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
      
      return navigate('/')
    }
  }
  return (
    <div className='login'>
    <h2>Login - form</h2>
        <form className='log-form' onSubmit={loginFun}>
        <input type='text' placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type='password' placeholder='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button>Login</button>
        </form>
     
    </div>
  )
}

export default Login
