import React from "react";      
import { useParams } from "react-router-dom"

const Messages = (props) => {
    const posts = props.posts
    let postTitle = ""
    let postMessages =  []

    const { id } = useParams()
    const post = posts.find(p =>  p._id === id)
    if (post){
        postTitle = post.title
        postMessages = post.messages
    }
    return (
        <div>
            <div>
            {postTitle}
            </div>
            <table>
                <tbody>
                    {postMessages.map((message)=>{
                    return (
                    <tr key = {message._id}>
                        <td>
                        {message.fromUser.username}
                        </td>
                        <td>
                        {message.content}
                        </td>

                    </tr>)
                    })}
                </tbody>
                </table>
        </div>
        
    )
    
}

export default Messages