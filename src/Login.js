import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';



const Login = (props)=> {
    const user = props.user
    const token = props.token
    const setToken = props.setToken
    const setUser = props.setUser
    const [username, setUserName] = useState([])
    const [password, setPassword] = useState([])
    const setPosts = props.setPosts
    
return (
    <form id="credentials" onSubmit={async (event) => {
        event.preventDefault()
            const url = "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/login";
          let credentials = {user: {
            username,
            password
             }}
             const bearer = `Bearer ${token}`
            try {
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
              const newToken = await response.json();
                if (newToken.success){
                    setToken(newToken.data.token);
                    setUser(credentials);
                    console.log(credentials);
                    document.cookie = `token=${newToken.data.token}`;

                      fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts', 
                      {headers: {
                        'Content-Type': 'application/json',
                      'Authorization': bearer
                      },})
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
                      .then( json => 
                        {
                          setPosts(json.data.posts)
                          console.log("set new post", json.data.posts)
                        })
                    
                      

                    } else {alert(newToken.error.message)}
              return newToken;
            } catch (error) {
              throw error;
            }
          
        }}>
    <div className='login-container'>
        <h1>Login</h1> 
        <div>
            {(token.length > 0 && !user) ?  <div>Welcome, some features require re-login</div>:null}

            {(token.length > 0) ?  <div><button onClick={async (event) => 
                        {
                          event.preventDefault();
                          document.cookie = `token=${token}; max-age=0;`;
                          setToken('');
                        }
                        }>Logout</button></div>:null}
            {(token.length === 0) ?  
                <table className='login-table'>
                    <tbody>
                    <tr><td>username</td><td> <input  onChange={ (event) => {setUserName(event.target.value)}} id= "username" type = "text"></input></td></tr> 
                    <tr><td>password</td><td> <input onChange={ (event) => {setPassword(event.target.value)}}  id= "password" type = "password"></input></td></tr>
                    <tr>
                        <td colSpan="2">
                            <button id = "loginButton">Login</button> 
                            <button id = "registerButton" onClick = {
                              async (event) => {
                                          event.preventDefault()
                                          const url = "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/register";
                                          let credentials = {user: {
                                            username,
                                            password
                                            }}
                                            try {
                                              const response = await fetch(url, {
                                                method: "POST",
                                                headers: {
                                                  'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(credentials)
                                            });
                                              const data = await response.json();
                                                if (data.success){
                                                    setToken(data.data.token);
                                                    setUser(credentials);
                                                    document.cookie = `token=${data.data.token}`;
                                                    console.log('create cookie');
                                                    } else {alert(data.error.message)}
                                              return data;
                                            } catch (error) {
                                              throw error;
                                            }
                      }
                      }>Register</button>
                    </td></tr>
                    {/* <tr><td colSpan="2"><button id = "registerButton">Register</button></td></tr> */}
                    </tbody>
                    </table>
        : null}
          </div>
          </div>
          </form>

)
}



  
export default Login