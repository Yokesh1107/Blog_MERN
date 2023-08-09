import { Link } from 'react-router-dom';
import '../App.css';
import { useContext,useEffect } from 'react';
import { UserContext } from './UserContext';

const Navbar = () => {
  const {setUserInfo,userInfo}=useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:2003/auth/profile',{
     credentials:'include',
     headers:{'Content-Type':'application/json'},
     method:'GET',
           
   }).then(response=>{
     response.json().then(userInfo=>{
       setUserInfo(userInfo)
     })
   })
 },[])
  const logoutFun=()=>{
    fetch('http://localhost:2003/auth/logout',{
      method:'POST',
      credentials:'include'
    })
    
      setUserInfo(null)
  }
  const username=userInfo?.username
  return (
    <div className='navbar'>
        <div className='logo'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Unicode_0x0042.svg/800px-Unicode_0x0042.svg.png'/>
            <div className='logo-name'>BlogSpot</div>
        </div>
        <div className='top-right'>
            <Link to='/'>Home</Link>
            {username && 
              <>
              
              <Link to='/create'>Create Posts</Link>
              <Link to='/posts'>Posts</Link>
              <Link to='/' onClick={logoutFun}>Logout</Link>
              </>
            }
            {!username &&
              <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </>
            }
        </div>
    </div>
  )
}

export default Navbar
