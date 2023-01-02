import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const CreatePost = (props) => {
    const token = props.token
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    console.log(props.token)

    return (
        
        <div>
            <form id="createPost" onSubmit={async (event) => {
        event.preventDefault()
            const url = "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts";
          let post = {post: {
            title,
            price,
            description,
            location
             }}
        const bearer = `Bearer ${token}`
          console.log(post, "hello")
            try {
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                'Authorization': bearer
                },
                body: JSON.stringify(post)
            });
              const data = await response.json();
                console.log(data,"asdf")
                if (data.success){
                    console.log("success")
                    // setToken(data.data.token)
                    } else {alert(data.error.message)}
              return data;
            } catch (error) {
              throw error;
            }
          
        }}>
                
                <table>
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <div>Create A Post</div>
                         </td>
                         </tr>
                         <tr>
                            <td>Title</td>
                            <td><input  onChange={ (event) => {{setTitle(event.target.value)}}} id = "title" type ="text"></input></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input  onChange={ (event) => {setPrice(event.target.value)}} id = "price" type = "text"></input></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea  onChange={ (event) => {setDescription(event.target.value)}} id = "description" type = "text"></textarea></td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td><input  onChange={ (event) => {setLocation(event.target.value)}} id = "description" type = "text"></input></td>
                        </tr>
                        <tr>
                            <td colSpan = "2">
                                <div><button id = "submitPost">submit post</button></div>
                            </td>
                        </tr>
                     </tbody>
                 </table>
                </form>
            </div>
    )
  }

export default CreatePost
