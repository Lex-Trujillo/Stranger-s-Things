import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';
import Posts from './Posts'
import Login from './Login'
import CreatePost from "./CreatePost"
import DisplayPost from "./DisplayPost"
import Profile from './Profile';
import Messages from './Messages'
import Searchbar from './Searchbar'

const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("") 

 useEffect(()=> {
  fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts')
  .then( response => {
    let tokenArray = [];
    if (document.cookie)
    {
      tokenArray = document.cookie.split('=');
      if (tokenArray.length === 2)
      {
        const savedToken = tokenArray[1];
        setToken(tokenArray[1])
      }
    }
    return response.json()
  })
  .then( json => setPosts(json.data.posts))

  }, [])

  
  return (
    <div>
      <div className="header">
            <h1 className='title'>Stranger's Things</h1>
            <nav>
            <Link className='nav-link' to='/profile'>Profile</Link>
              <Link className='nav-link' to='/posts'>Posts ({posts.length})</Link>
              <Link className='nav-link' to='/login'>Login</Link>
            
              {/* <Link to='/register'>Register</Link> */}
            {/* {(token.length > 0) ?  <Link to='/loggedIn'>Logged In</Link>:null} */}
            {(token.length > 0) ?  <Link  className='nav-link' to='/createpost'>Create Post</Link>:null}
            </nav>
      </div>
      <Routes>

      <Route path='/profile' element= { <div>{
        <Profile
        posts = {posts}
        user = { user }
        />}</div>}/>
        <Route path='/messages/:id' element= { <div>{
        <Messages
        posts = {posts}

        />}</div>}/>
        <Route path='/posts' element= { <div>{ 
        <Posts 
        posts={ posts }
         />}</div>}/>
         <Route path='/searchbar' element={<div><Searchbar></Searchbar></div>}
         />
        <Route path='/posts/:id' element= { <div>{
          <DisplayPost
              posts = { posts }
              user = { user }
              token = { token }
          />}</div>}/>
        <Route path='/login' element={ <div>{
          <Login 
          user = {user}
          token = {token}
          setToken = {setToken}
          setUser = {setUser}
          setPosts = {setPosts}
        />}</div>}/>
        <Route path='/createpost' element = {<div>{<CreatePost token = {token} />}</div>}/>
        {/* <Route path='/register' element={ <div>Register</div>} /> */}
        <Route path='/loggedIn' element= {<div>Logged In</div>}/>
        {/* <Route path="/register" element ={<div>{<Register/>}</div>}/> */}
      </Routes> 
    </div>

  );
};


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
