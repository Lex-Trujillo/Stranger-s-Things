import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const Profile = (props) => {
    const user = props.user;
    const posts = props.posts;
   let myPosts = [];


    let userName = '';
    if (user)
    {
        userName = user.user.username;

         posts.forEach( post => {
            if (userName === post.author.username)
            {
                myPosts.push(post)
            }
        } );     

        console.log('my posts', myPosts)


    }

    return (
        <div>
           <div> {userName}</div>
        
        
    <table border="1px">
        <tbody>
        {
            myPosts.map(
                myPost => {
                    return( <tr key="myPost._id">
                                    <td>{myPost.title}</td>
                                   <td>{myPost.description}</td>
                                   <td>{myPost.location}</td>
                                   <td>{myPost.price}</td>
                                   <td>{myPost.isAuthor ? "T": "F"}</td>
                                   <td>{myPost.createdAt}</td>
                                   <td><Link to={`/messages/${myPost._id}`}>{myPost.messages.length} messages</Link></td>
                                    </tr> )
                }
            )
        }
        </tbody>
        </table>
</div>
    )
}

export default Profile;