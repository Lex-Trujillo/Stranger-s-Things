import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';

const DisplayPost = (props) => {
    const posts = props.posts
    const user = props.user
    const token = props.token
    
    let userName = '';
    if (user)
    {
        userName = user.user.username;
    }
   console.log('user', 'credentials', props)

    const { id } = useParams()
    let newMessage = ""
    let viewedPost 
    let postID = ""
    let postDescription = ""
    let postAuthor = ""
    let postPrice = ""
    let postTitle = ""
    let postDeliver="No"
    console.log("line 8", viewedPost)
    posts.forEach(post=> {
        if (post._id===id){
            postID = post._id
            viewedPost = post
            postDescription = post.description
            postAuthor = post.author.username
            postPrice = post.price
            postTitle = post.title
            if (post.willDeliver === true){
                postDeliver = "Yes"
            }
             console.log(post, "assigning post", viewedPost)
            // console.log("line 13", viewedPost)
        }
        }
        ) 
    // console.log(viewedPost, id, "here", "line 16")
    return (
        <table>
            <tbody>
                <tr>
                    <td colSpan='2'>
                    {postTitle}
                    </td>
                </tr>
                <tr>
                    <td>ID:</td>
                    <td>{postID}</td>
                </tr>
                <tr>
                    <td>Author:</td>
                    <td>{postAuthor}</td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td>{postDescription}</td>
                </tr>
                <tr>
                    <td>Price:</td>
                    <td>{postPrice}</td>
                </tr>
                <tr>
                    <td>Delivery:</td>
                    <td>{postDeliver}</td>
                </tr>
                {(userName.length > 0 && userName !== postAuthor)?<tr>
                    <td>
                        <textarea onChange={(event)=>{newMessage = event.target.value}}></textarea>
                        <br></br>
                        <button onClick={(event)=>{
                            const bearer = `Bearer ${token}`
                            fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts/'+postID+'/messages', {
                                 method: "POST",
                                 headers: {
                                         'Content-Type': 'application/json',
                                        'Authorization': bearer
                                    },
                                    body: JSON.stringify({
                                        message: {
                                        content: newMessage
                                        }
                                    })
                                    }).then(response => response.json())
                                    .then(result => {
                                     alert("message sent")
                                     console.log(result);
                                    })
                                    .catch(console.error);
                        }}>Send Message</button>
                    </td>
                </tr> :null}
                <tr>
                {( userName === postAuthor) ?
                    <td colSpan='2'><button onClick={
                        (event) => {
                            const bearer = `Bearer ${token}`

                            fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts/${postID}`, {
                                method: "DELETE",
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': bearer
                                }
                              }).then(response => response.json())
                                .then(result => {
                                  console.log(result);
                                })
                                .catch(console.error);
                        }
                    } >Delete</button></td>
                    :<td colSpan='2'>Login Required To Delete</td>}
                </tr>
            </tbody>
        </table>
        // <div>
        //     <div></div>
        // <div></div>
        // <div>{postDescription}</div>
        // <div>{postAuthor}</div>
        // <div>{postPrice}</div>
        // <div>{postDeliver}</div>
        // </div>
    )
}

export default DisplayPost