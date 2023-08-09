
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Post from './components/Post';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Register from './pages/Register';
import Layout from './components/Layout';
import ViewPost from './pages/ViewPost';
import { UserContext, UserContextProvider } from './components/UserContext';
import { useContext } from 'react';

function App() {
  const {userInfo,setUserInfo}=useContext(UserContext)
  return (
    <UserContextProvider>
    <Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Header/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path={'/posts'} element={<Posts/>}/>
    <Route path='/create' element={<CreatePost/>}/>
    <Route path='/edit/:id' element={<EditPost/>}/>
    <Route path='/post/:id' element={<ViewPost/>}/>
    </Route>
    
    </Routes>
    </UserContextProvider>
  );
}

export default App;
